import { PlayVideoInfo } from '@/types/video';
import logger from '@/utils/logger';
import { biliClient } from './apis';
import { startTimekeeping } from './timeKeeper';
import { addClass, addStyle } from './utils';

let popupBox: HTMLDivElement | null = null;
let titleBox: HTMLDivElement | null = null;
let videoImg: HTMLDivElement | null = null;
let title: HTMLAnchorElement | null = null;
let titleStr: Text | null = null;

export function initialVideo() {
  titleBox = document.createElement('div');
  title = document.createElement('a');
  title.setAttribute('href', 'https://www.bilibili.com/video/');
  titleStr = document.createTextNode('');
  title.appendChild(titleStr);
  const titleIcon = document.createElement('img');
  titleIcon.src = chrome.extension.getURL('/img/guanbi-1.svg');
  titleBox.appendChild(title);
  videoImg = document.createElement('div');
  addStyle(videoImg, {
    backgroundImage: '',
  });
  // videoImg.style.backgroundImage = '';
  addClass(titleBox, 'huiyou-title-box');
  addClass(title, 'huiyou-title');
  addClass(videoImg, 'huiyou-pic');
  addClass(titleIcon, 'huiyou-title-icon');
  videoImg.appendChild(titleBox);
  videoImg.appendChild(titleIcon);
  if (popupBox !== null) {
    popupBox.appendChild(videoImg);
  }
  return videoImg;
}

export function initialBox() {
  const { body } = document;
  logger.log('init popup-box');
  popupBox = document.createElement('div');
  addStyle(popupBox, {
    visibility: 'hidden',
  });
  body.appendChild(popupBox);
  addClass(popupBox, 'huiyou-popup-box');
  return popupBox;
}

export async function showVideo(bvid: string): Promise<PlayVideoInfo | null> {
  const video = await biliClient.getVideoInfo(bvid);
  logger.log(`video: ${video?.bvid}`);
  if (video !== null) {
    if (popupBox !== null && videoImg !== null && title !== null) {
      startTimekeeping(popupBox);
      addStyle(popupBox, { visibility: 'visible' });
      if (title.firstChild !== null) {
        title.removeChild(title.firstChild); // 删除原来的节点
      }
      titleStr = document.createTextNode(video.title);
      title.appendChild(titleStr);
      title.setAttribute('href', `https://www.bilibili.com/video/${video.bvid}`);
      addStyle(videoImg, {
        backgroundImage: ` url(${video.pic}`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      });
    }
  }

  return video;
}
