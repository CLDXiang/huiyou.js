import { Message } from '@/types/message';
import { PlayVideoInfo, VideoShot } from '@/types/video';
import logger from '@/utils/logger';
import './popup.less';
import { initialBox, initialVideo, showVideo } from './showVideo';
import { modifyRemainingTime, shutTimeKeeping } from './timeKeeper';
import { changeVideoShot } from './videoShot';

logger.log('DEBUG_MODE enabled!');

/** 监听网络请求。play paused 视频播放 窗口聚焦等操作 */
const bvidArr = window.location.href.match(/BV(.{10})/);
const bvid = (bvidArr && bvidArr.length && bvidArr[1]) || null;
logger.log(`bvid: ${bvid}`);

const uidArr = document.cookie.match(/DedeUserID=([\d]+);/);
const uid = (uidArr && uidArr.length && uidArr[1]) || null;
logger.log(`uid: ${uid}`);

// 视频播放
const media = document.querySelector('video');
let aid: number | null = null;
let vid: PlayVideoInfo | null = null;
let bvidGet: string | null = null;
let docUrl = '';
let imgUrl: VideoShot | null = null;

// 初始化弹窗并隐藏
const box = initialBox();
const imgBox = initialVideo();

if (media !== null && uid !== null && bvid !== null) {
  // 认为可以推送视频的时候
  const pushMessage: Message<'fetchVideo'> = {
    type: 'fetchVideo',
    payload: {
      uid,
    },
  };
  const pauseMessage: Message<'pauseVideo'> = {
    type: 'pauseVideo',
    payload: {
      uid,
      bvid,
      playedTime: media.currentTime, // 现在简单地认为duration就是播放时长
      totalDuration: media.duration,
    },
  };

  const focusMessage: Message<'synchronizeTime'> = {
    type: 'synchronizeTime',
    payload: undefined,
  };
  /** 监听play变量 */
  const playMessage: Message<'playVideo'> = {
    type: 'playVideo',
    payload: {
      bvid,
      uid,
    },
  };

  const pushVideo = () => {
    // 如果打开多tabs的话以当前tab为准
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //  chrome.tabs.sendMessage(<number>(tabs[0].id),pushMessage,function(response){
    chrome.runtime.sendMessage(pushMessage, async (response) => {
      logger.log('push message sent');
      // logger.log(response);
      if (response !== null) {
        logger.log('show video');
        bvidGet = response.bvid;
        if (bvidGet !== null) {
          vid = await showVideo(bvidGet);
          if (vid !== null) {
            docUrl = vid.pic;
            aid = vid.aid;
          }
          logger.log(`aid:${aid}`);
          logger.log(`dddd: ${docUrl}`);
          imgUrl = null;
        }
      }
    });
  };

  media.addEventListener('play', () => {
    logger.log('Video Start');
    // const video = fetchVideo(url);
    logger.log('send play message');
    chrome.runtime.sendMessage(playMessage, () => {
      logger.log('play message sent');
    });
  });
  // 视频停止
  media.addEventListener('pause', () => {
    logger.log('Video Paused');
    // const video = fetchVideo(url);
    pushVideo();
    chrome.runtime.sendMessage(pauseMessage, () => {
      logger.log('pause message sent');
    });
  });

  // 关闭窗口（视频停止）
  window.addEventListener('beforeunload', () => {
    logger.log('window closed');
    chrome.runtime.sendMessage(pauseMessage, (response) => {
      logger.log('unload message sent');
      logger.log(response);
      shutTimeKeeping(box);
    });
  });

  // 失去焦点，需要关闭计时器
  window.addEventListener('blur', () => {
    logger.log('window closed');
    chrome.runtime.sendMessage(pauseMessage, (response) => {
      logger.log('blur');
      logger.log(response);
      shutTimeKeeping(box);
    });
  });

  // 窗口聚焦 需要重启计时器
  window.addEventListener('focus', () => {
    logger.log('window focused');
    chrome.runtime.sendMessage(focusMessage, (response) => {
      logger.log('focus message sent', response);
      if (response !== null) {
        modifyRemainingTime(response, box);
      }
    });
  });

  imgBox.addEventListener('mouseleave', () => {
    logger.log(docUrl);
    imgBox.style.backgroundImage = `url(${docUrl})`;
    logger.log(`mouse leave${imgBox.style.backgroundImage}`);
    imgBox.style.backgroundPositionX = '0px';
    imgBox.style.backgroundPositionY = '10px';
    imgBox.style.backgroundRepeat = 'no-repeat';
    imgBox.style.backgroundSize = '100% 100%';
  });

  imgBox.addEventListener('mouseover', (e) => {
    if (aid !== null) {
      logger.log(`over${e.screenX}`);
      changeVideoShot(aid, imgBox, e.screenX, imgUrl);
    }
  });

  imgBox.addEventListener('mousemove', (e) => {
    if (aid !== null) {
      logger.log(`move${e.screenX}`);
      changeVideoShot(aid, imgBox, e.screenX, imgUrl);
    }
  });
}
