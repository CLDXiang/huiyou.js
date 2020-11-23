import axios from 'axios';
import { PlayVideoInfo } from '@/types/video';
import logger from '@/utils/logger';
import { GetVideoInfoResponseBody } from '@/types/bilibiliApiRequest';
import { TIMEKEEPING } from './config';
import { addClass } from './utils';

const { DURATION } = TIMEKEEPING;

let expiration: number | null = null;
let popupBox: HTMLDivElement | null = null;
let titleBox: HTMLDivElement | null = null;
let videoImg: HTMLDivElement | null = null;
let title: HTMLAnchorElement | null = null;
let titleStr: Text | null = null;

// let showVideo: VideoInfo | null = null;

function offVideo() {
  const classes = document.getElementsByClassName('huiyou-popup-box');
  if (classes.length > 0) {
    logger.info('with popup-box');
    if (popupBox !== null) {
      popupBox.style.visibility = 'hidden';
    }
  }
}

export function startTimekeeping() {
  expiration = +new Date() + DURATION;
  setTimeout(() => {
    // TODO
    expiration = null;
    offVideo();
  }, DURATION);
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

export async function fetchVideo(bvid: number): Promise<PlayVideoInfo| null> {
  logger.info(bvid);
  const url = `https://api.bilibili.com/x/web-interface/view?&bvid=${bvid}`;
  const response = await axios.get<GetVideoInfoResponseBody>(url);
  if (response.status !== 200) {
    return null;
  }
  const { data } = response;
  logger.info(data);
  if (data.data === null) {
    return data.data;
  } return data.data;
}

export function initialVideo() {
  const { body } = document;
  logger.info('init popup-box');
  popupBox = document.createElement('div');
  popupBox.style.visibility = 'hidden';
  titleBox = document.createElement('div');
  title = document.createElement('a');
  title.setAttribute('href', 'https://www.bilibili.com/video/');
  titleStr = document.createTextNode('');
  title.appendChild(titleStr);
  const titleIcon = document.createElement('img');
  titleIcon.src = 'img/guanbi-1.svg';
  titleBox.appendChild(title);
  videoImg = document.createElement('div');
  videoImg.style.backgroundImage = '';
  videoImg.style.backgroundSize = '1680px';
  addClass(popupBox, 'huiyou-popup-box');
  addClass(titleBox, 'huiyou-title-box');
  addClass(title, 'huiyou-title');
  addClass(videoImg, 'huiyou-pic');
  addClass(titleIcon, 'huiyou-title-icon');
  videoImg.appendChild(titleBox);
  videoImg.appendChild(titleIcon);
  popupBox.appendChild(videoImg);
  body.appendChild(popupBox);
  return videoImg;
}

export async function showVideo(bvid: number) {
  logger.info('show?');
  logger.info(`expire${expiration}`);
  // if (expiration !== null) {
  const video = await fetchVideo(bvid);
  let aid = null;
  if (video !== null) {
    // TODO: 一开始就生成dom 只控制可见性和属性
    startTimekeeping();
    aid = video?.aid;
    if (popupBox !== null && videoImg !== null && title !== null) {
      popupBox.style.visibility = 'visible';
      if (title.firstChild !== null) {
        title.removeChild(title.firstChild); // 删除原来的节点
      }
      titleStr = document.createTextNode(video.title);
      title.appendChild(titleStr);
      title.setAttribute('href', `https://www.bilibili.com/video/${video.bvid}`);
      videoImg.style.backgroundImage = `url(${video.pic})`;
      logger.info(videoImg);
    }
  }
  return aid;
}
