import { PlayVideoInfo } from '@/types/video';
import logger from '@/utils/logger';
import imgStatic from '@/assets/simple-tag.png';
import { biliClient } from './apis';
import { addClass, addStyle } from './utils';

let popupBox: HTMLDivElement | null = null;
let hoverBox: HTMLDivElement | null = null;
let hoverImg: HTMLImageElement | null = null;
let imgBox: HTMLDivElement | null = null;
let title: HTMLDivElement | null = null;

export function offHoverIcon() {
  if (hoverBox !== null) {
    addStyle(hoverBox, {
      visibility: 'hidden',
    });
  }
}

export function initialHoverIcon() {
  const { body } = document;
  logger.log('hover Icon');
  hoverBox = document.createElement('div');
  hoverImg = document.createElement('img');
  hoverImg.src = imgStatic;
  hoverBox.appendChild(hoverImg);
  addClass(hoverBox, 'huiyou-bubble');
  addClass(hoverImg, 'huiyou-bubble-img');
  addStyle(hoverBox, { visibility: 'visible' });
  body.appendChild(hoverBox);
  return hoverImg;
}

export function initialVideo() {
  imgBox = document.createElement('div');
  addClass(imgBox, 'huiyou-pic-box');
  title = document.createElement('div');
  addClass(title, 'huiyou-title');
  title.innerText = '';

  // TODO: 绑定点击事件
  const closeIconEle = document.createElement('img');
  addClass(closeIconEle, 'huiyou-close-icon');
  closeIconEle.src = imgStatic;
  closeIconEle.width = 8;

  imgBox.append(title, closeIconEle);
  if (popupBox !== null) {
    const statsBar = document.createElement('div');
    addClass(statsBar, 'huiyou-stats-bar');
    // TODO: 加播放量

    popupBox.append(imgBox, statsBar);
  }
  return imgBox;
}

export function initialBox() {
  const { body } = document;
  logger.log('init popup-box');
  popupBox = document.createElement('div');
  addStyle(popupBox, {
    visibility: 'hidden',
  });
  addClass(popupBox, 'huiyou-popup-box');
  body.appendChild(popupBox);
  return popupBox;
}

export async function showVideo(bvid: string): Promise<PlayVideoInfo | null> {
  const video = await biliClient.getVideoInfo(bvid);
  logger.log(`video: ${video?.bvid}`);
  if (video !== null) {
    if (popupBox !== null && imgBox !== null && title !== null) {
      title.innerText = video.title || '';
      addStyle(imgBox, {
        backgroundImage: `url(${video.pic}`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      });
      popupBox.onclick = () => {
        window.location.href = `https://www.bilibili.com/video/${video.bvid}`;
      };
      addStyle(popupBox, { visibility: 'visible' });
    }
  }
  return video;
}

export function offVideo() {
  if (popupBox !== null) {
    addStyle(popupBox, { visibility: 'hidden' });
  }
  if (hoverBox !== null) {
    addStyle(hoverBox, { visibility: 'visible' });
  }
}

export function onVideo() {
  if (popupBox !== null) {
    addStyle(popupBox, { visibility: 'visible' });
  }
  if (hoverBox !== null) {
    addStyle(hoverBox, { visibility: 'hidden' });
  }
}
