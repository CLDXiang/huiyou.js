import { VideoInfo } from '@/types/video';
import logger from '@/utils/logger';
import { TIMEKEEPING } from './config';
import { addClass } from './utils';

const { DURATION } = TIMEKEEPING;

let expiration: number | null = null;
// let showVideo: VideoInfo | null = null;

function offVideo() {
  const classes = document.getElementsByClassName('huiyou-popup-box');
  if (classes.length > 0) {
    logger.info('with popup-box');
    const popupBox = classes[0] as HTMLElement;
    popupBox.style.visibility = 'hidden';
  }
}

export function startTimekeeping() {
  expiration = +new Date() + DURATION;
  setTimeout(() => {
    expiration = null;
    offVideo();
  }, DURATION);
}

export function getRemainingTime(): number | null {
  if (expiration !== null) {
    return expiration - +new Date();
  }
  return null;
}

export function modifyRemainingTime(time: number) {
  logger.info(`before${expiration}`);
  if (time !== null) {
    expiration = time;
    logger.info(`after${expiration}`);
  } else {
    offVideo();
  }
}

export function showVideo(video: VideoInfo) {
  logger.info('show?');
  logger.info(`expire${expiration}`);
  // if (expiration !== null) {
  logger.info(`video${video}`);
  if (video !== null) {
    // TODO: 一开始就生成dom 只控制可见性和属性
    startTimekeeping();
    const { body } = document;
    const classes = document.getElementsByClassName('huiyou-popup-box');
    if (classes.length > 0) {
      logger.info('with popup-box');
      const popupBox = classes[0] as HTMLElement;
      popupBox.style.visibility = 'visible';
      const title = document.getElementsByClassName('huiyou-title')[0];
      if (title.firstChild !== null) {
        title.removeChild(title.firstChild); // 删除原来的节点
      }
      const titleStr = document.createTextNode(video.title);
      title.appendChild(titleStr);
      title.setAttribute('href', `https://www.bilibili.com/video/BV${video.bvid}`);
      const img = document.getElementsByClassName('huiyou-pic')[0] as HTMLImageElement;
      img.src = video.pic;
    } else {
      // 创建pop-upbox
      logger.info('no popup-box');
      const popupBox = document.createElement('div');
      const title = document.createElement('a');
      title.setAttribute('href', `https://www.bilibili.com/video/${video.bvid}`);
      const titleStr = document.createTextNode(video.title);
      title.appendChild(titleStr);
      const img = document.createElement('img');
      img.src = video.pic;
      addClass(popupBox, 'huiyou-popup-box');
      addClass(title, 'huiyou-title');
      addClass(img, 'huiyou-pic');
      popupBox.appendChild(title);
      popupBox.appendChild(img);
      body.appendChild(popupBox);
    }
  }
}
