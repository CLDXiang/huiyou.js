import { PlayVideoInfo, VideoShot } from '@/types/video';
import logger from '@/utils/logger';
import { parsePlayedCount } from '@/utils/videoInfo';
import { biliClient } from './apis';
import { addClass, addStyle } from './utils';

const closeIcon = chrome.runtime.getURL('img/close.svg');

/** 页面弹窗 */
export class Popup {
  constructor() {
    const { body } = document;
    logger.info('初始化页面弹窗');

    this.popupBox = document.createElement('div');
    addClass(this.popupBox, ['huiyou-popup-box', 'huiyou-hidden']);

    this.imgBox = document.createElement('div');
    addClass(this.imgBox, 'huiyou-img-box');

    this.title = document.createElement('div');
    addClass(this.title, 'huiyou-title');
    this.title.innerText = '';

    this.closeIconEle = document.createElement('img');
    addClass(this.closeIconEle, 'huiyou-close-icon');
    this.closeIconEle.src = closeIcon;
    this.closeIconEle.width = 10;

    this.imgBox.append(this.title, this.closeIconEle);
    // 视频预览
    this.imgBox.addEventListener('mouseleave', () => {
      logger.log('mouseleave');
      // 鼠标离开时恢复封面
      if (this.video) {
        addStyle(this.imgBox, {
          background: `url(${this.video.pic}) 0 0 / 100% 100% no-repeat`,
        });
      }
    });

    this.imgBox.addEventListener('mousemove', (e) => {
      if (!this.mouseoverCoolDown) {
        this.mouseoverCoolDown = true;
        setTimeout(() => {
          this.mouseoverCoolDown = false;
        }, 233);
        this.showVideoShot(e.clientX);
      }
    });

    /** 底部状态栏 */
    const statsBar = document.createElement('div');
    addClass(statsBar, 'huiyou-stats-bar');

    const playedCountBox = document.createElement('span');
    addClass(playedCountBox, 'huiyou-played-count-box');

    const playedCountIcon = document.createElement('i');
    addClass(playedCountIcon, ['bilifont', 'bili-icon_shipin_bofangshu']);

    this.playedCount = document.createElement('span');
    addClass(this.playedCount, 'huiyou-played-count');

    playedCountBox.append(playedCountIcon, this.playedCount);

    const authorBox = document.createElement('span');
    addClass(authorBox, 'huiyou-author-box');

    const authorIcon = document.createElement('i');
    addClass(authorIcon, ['bilifont', 'bili-icon_xinxi_UPzhu']);

    this.author = document.createElement('span');
    addClass(this.author, 'huiyou-author');

    authorBox.append(authorIcon, this.author);

    statsBar.append(playedCountBox, authorBox);

    this.popupBox.append(this.imgBox, statsBar);

    // 挂载 DOM
    body.appendChild(this.popupBox);
  }

  /** 弹窗容器 */
  private popupBox: HTMLDivElement;

  /** 视频预览容器 */
  private imgBox: HTMLDivElement;

  /** 关闭按钮 */
  private closeIconEle: HTMLImageElement;

  /** 视频标题 */
  private title: HTMLDivElement;

  /** 播放量 */
  private playedCount: HTMLSpanElement;

  /** Up 主 */
  private author: HTMLSpanElement;

  /** 视频数据 */
  video: PlayVideoInfo | null = null;

  /** 视频快照 */
  private videoShot: VideoShot | null = null;

  /** mouseover 节流冷却中 */
  private mouseoverCoolDown = false;

  /** 导入视频数据 */
  async showVideo(bvid: string) {
    try {
      const video = await biliClient.getVideoInfo(bvid);
      if (video) {
        this.video = video;
        this.title.innerText = video.title || '-';
        addStyle(this.imgBox, {
          background: `url(${video.pic}) 0 0 / 100% 100% no-repeat`,
        });
        this.popupBox.onclick = () => {
          window.location.href = `https://www.bilibili.com/video/${video.bvid}`;
          // 关闭
          this.closeIconEle.click();
        };
        // TODO: hover up 主名字变蓝，点击进 up 主页
        this.playedCount.innerText = parsePlayedCount(video.stat.view);
        this.author.innerText = video.owner.name || '-';
        this.showPopup();
        this.videoShot = await biliClient.getVideoShot(bvid);
      } else {
        logger.error(`获取视频信息失败：${bvid}`);
      }
    } catch {
      logger.error(`获取视频信息失败：${bvid}`);
    }
  }

  /** 显示弹窗 */
  showPopup() {
    this.popupBox.classList.remove('huiyou-hidden');
  }

  /** 隐藏弹窗 */
  hidePopup() {
    this.popupBox.classList.add('huiyou-hidden');
  }

  /** 重置弹窗 */
  resetPopup() {
    this.hidePopup();
    this.video = null;
    this.videoShot = null;
    this.title.innerText = '-';
    this.playedCount.innerText = '-';
    this.author.innerText = '-';
    addStyle(this.imgBox, {
      background: '#fff',
    });
    this.popupBox.onclick = () => null;
  }

  /** 绑定关闭事件 */
  onClose(callback: (e: MouseEvent) => void) {
    this.closeIconEle.onclick = callback;
  }

  /** 显示快照 */
  showVideoShot(clientX: number) {
    if (!this.videoShot) {
      return;
    }
    /** imgBox 左边距 */
    const imgBoxX = this.imgBox.getBoundingClientRect().left;
    /** imgBox */
    const imgBoxWidth = this.imgBox.clientWidth;
    const imgBoxHeight = this.imgBox.clientHeight;
    const {
      imgXLen, imgYLen, image, imgXSize, imgYSize, index,
    } = this.videoShot;
    if (!imgXLen || !imgYLen || !image || !image.length || !imgXSize || !imgYSize) {
      return;
    }
    /** 图片序号 */
    const idx = Math.floor(
      ((clientX - imgBoxX) / imgBoxWidth) * (index.length || imgXLen), // 有时候 index 是空的！
    );

    /** 位于第几张图 */
    const imgIdx = Math.floor(idx / imgXLen / imgYLen);
    const positionX = -imgBoxWidth * (idx - Math.floor(idx / imgXLen) * imgXLen);
    const positionY = -imgBoxHeight * Math.floor(idx / imgXLen);
    const backgroundWidth = imgBoxWidth * imgXLen;
    const backgroundHeight = imgBoxHeight * imgYLen;
    addStyle(this.imgBox, {
      background: `url(${image[imgIdx]}) ${positionX}px ${positionY}px / ${backgroundWidth}px ${backgroundHeight}px no-repeat`,
    });
  }
}
