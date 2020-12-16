import closeIcon from '@/assets/close.svg';
import { PlayVideoInfo, VideoShot } from '@/types/video';
import logger from '@/utils/logger';
import { biliClient } from './apis';
import { addClass, addStyle } from './utils';

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
        this.showVideoShot(e.screenX);
      }
    });

    /** 底部状态栏 */
    const statsBar = document.createElement('div');
    addClass(statsBar, 'huiyou-stats-bar');
    // TODO: 加播放量

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

  /** 视频数据 */
  video: PlayVideoInfo | null = null;

  /** 视频快照 */
  private videoShot: VideoShot | null = null;

  /** mouseover 节流冷却中 */
  private mouseoverCoolDown = false;

  /** 导入视频数据 */
  async showVideo(bvid: string): Promise<PlayVideoInfo | null> {
    try {
      const video = await biliClient.getVideoInfo(bvid);
      if (video) {
        this.video = video;
        this.title.innerText = video.title || '';
        addStyle(this.imgBox, {
          background: `url(${video.pic}) 0 0 / 100% 100% no-repeat`,
        });
        this.popupBox.onclick = () => {
          window.location.href = `https://www.bilibili.com/video/${video.bvid}`;
        };
        this.showPopup();
        this.videoShot = await biliClient.getVideoShot(bvid);
      } else {
        logger.error(`获取视频信息失败：${bvid}`);
      }
    } catch {
      logger.error(`获取视频信息失败：${bvid}`);
    }
    return null;
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
    this.title.innerText = '';
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
  showVideoShot(screenX: number) {
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
    let idx = 0;
    if (index.length === 0) {
      // 有时候 index 是空的！
      idx = Math.floor(((screenX - imgBoxX) / imgBoxWidth) * imgXLen);
    } else {
      idx = Math.floor(((screenX - imgBoxX) / imgBoxWidth) * index.length);
    }
    /** 位于第几张图 */
    const imgIdx = Math.floor(idx / imgXLen / imgYLen);
    const positionX = -imgBoxWidth * (idx - Math.floor(idx / imgXLen) * imgXLen);
    const positionY = -imgBoxHeight * Math.floor((idx / imgXLen));
    const backgroundWidth = imgBoxWidth * imgXLen;
    const backgroundHeight = imgBoxHeight * imgYLen;
    addStyle(this.imgBox, {
      background: `url(${image[imgIdx]}) ${positionX}px ${positionY}px / ${backgroundWidth}px ${backgroundHeight}px no-repeat`,
    });
  }
}
