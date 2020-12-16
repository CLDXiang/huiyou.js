import closeIcon from '@/assets/close.svg';
import { PlayVideoInfo } from '@/types/video';
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

    // TODO: 绑定点击事件
    /** 关闭按钮 */
    const closeIconEle = document.createElement('img');
    addClass(closeIconEle, 'huiyou-close-icon');
    closeIconEle.src = closeIcon;
    closeIconEle.width = 10;

    this.imgBox.append(this.title, closeIconEle);
    // TODO: 视频预览

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

  /** 视频标题 */
  private title: HTMLDivElement;

  /** 导入视频数据 */
  async showVideo(bvid: string): Promise<PlayVideoInfo | null> {
    try {
      const video = await biliClient.getVideoInfo(bvid);
      if (video !== null) {
        this.title.innerText = video.title || '';
        addStyle(this.imgBox, {
          backgroundImage: `url(${video.pic}`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        });
        this.popupBox.onclick = () => {
          window.location.href = `https://www.bilibili.com/video/${video.bvid}`;
        };
        this.showPopup();
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
}
