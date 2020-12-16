import logger from '@/utils/logger';
import imgStatic from '@/assets/simple-tag.png';
import imgHover from '@/assets/simple-tag-hover.gif';
import { addClass } from './utils';

/** 页面推送气泡 */
export class Bubble {
  constructor() {
    const { body } = document;
    logger.info('初始化推送气泡');

    this.bubbleBox = document.createElement('div');
    addClass(this.bubbleBox, 'huiyou-bubble-box');

    this.img = document.createElement('img');
    addClass(this.img, 'huiyou-bubble-img');
    this.img.src = imgStatic;
    this.img.addEventListener('mouseover', () => {
      this.img.src = imgHover;
    });
    this.img.addEventListener('mouseleave', () => {
      this.img.src = imgStatic;
    });

    this.bubbleBox.appendChild(this.img);

    body.appendChild(this.bubbleBox);
  }

  /** 气泡容器 */
  private bubbleBox: HTMLDivElement;

  /** 气泡图片 */
  private img: HTMLImageElement;

  /** 显示气泡 */
  showBubble() {
    this.bubbleBox.classList.remove('huiyou-hidden');
  }

  /** 隐藏气泡 */
  hidePopup() {
    this.bubbleBox.classList.add('huiyou-hidden');
  }

  /** 绑定点击事件 */
  handleClick(callBack: (e: MouseEvent) => void) {
    this.img.onclick = callBack;
  }
}
