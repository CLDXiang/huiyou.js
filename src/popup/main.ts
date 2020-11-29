import { MessagePayloadMap } from '@/types/message';
import { PlayVideoInfo, VideoShot } from '@/types/video';
import { DEBUG_MODE } from '@/utils/config';
import logger from '@/utils/logger';
import { sendMessage } from '@/utils/message';
import './popup.less';
import { initialBox, initialVideo, showVideo } from './showVideo';
import { modifyRemainingTime, shutTimeKeeping } from './timeKeeper';
import { changeVideoShot } from './videoShot';

if (DEBUG_MODE) {
  logger.info('DEBUG_MODE enabled!');
}

/** 监听网络请求。play paused 视频播放 窗口聚焦等操作 */
const bvidArr = window.location.href.match(/BV(.{10})/);
const bvid = bvidArr?.[1] ?? null;
logger.info(`bvid: ${bvid}`);

const uidArr = document.cookie.match(/DedeUserID=([\d]+);/);
const uid = uidArr?.[1] ?? null;
logger.info(`uid: ${uid}`);

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
  const payloads: MessagePayloadMap = {
    playVideo: {
      bvid,
      uid,
    },
    pauseVideo: {
      uid,
      bvid,
      playedTime: media.currentTime, // 现在简单地认为duration就是播放时长
      totalDuration: media.duration,
    },
    fetchVideo: {
      uid,
    },
    synchronizeTime: undefined,
  };

  const pushVideo = () => {
    // 如果打开多tabs的话以当前tab为准
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //  chrome.tabs.sendMessage(<number>(tabs[0].id),pushMessage,function(response){
    sendMessage('fetchVideo', payloads.fetchVideo, async (response) => {
      logger.info('push message sent');
      // logger.info(response);
      if (response !== null) {
        logger.info('show video');
        bvidGet = response.bvid;
        if (bvidGet !== null) {
          vid = await showVideo(bvidGet);
          if (vid !== null) {
            docUrl = vid.pic;
            aid = vid.aid;
          }
          logger.info(`aid:${aid}`);
          logger.info(`dddd: ${docUrl}`);
          imgUrl = null;
        }
      }
    });
  };

  media.addEventListener('play', () => {
    logger.info('Video Start');
    logger.info('send play message');
    sendMessage('playVideo', payloads.playVideo, () => {
      logger.info('play message sent');
    });
  });
  // 视频停止
  media.addEventListener('pause', () => {
    logger.info('Video Paused');
    // const video = fetchVideo(url);
    pushVideo();
    sendMessage('pauseVideo', payloads.pauseVideo, () => {
      logger.info('pause message sent');
    });
  });

  // 关闭窗口（视频停止）
  window.addEventListener('beforeunload', () => {
    logger.info('window closed');
    sendMessage('pauseVideo', payloads.pauseVideo, () => {
      logger.info('unload message sent');
      shutTimeKeeping(box);
    });
  });

  // 失去焦点，需要关闭计时器
  window.addEventListener('blur', () => {
    logger.info('window closed');
    sendMessage('pauseVideo', payloads.pauseVideo, () => {
      logger.info('blur');
      shutTimeKeeping(box);
    });
  });

  // 窗口聚焦 需要重启计时器
  window.addEventListener('focus', () => {
    logger.info('window focused');
    sendMessage('synchronizeTime', payloads.synchronizeTime, (response) => {
      logger.info('focus message sent', response);
      if (response !== null) {
        modifyRemainingTime(response, box);
      }
    });
  });

  imgBox.addEventListener('mouseleave', () => {
    logger.info(docUrl);
    imgBox.style.backgroundImage = `url(${docUrl})`;
    logger.info(`mouse leave${imgBox.style.backgroundImage}`);
    imgBox.style.backgroundPositionX = '0px';
    imgBox.style.backgroundPositionY = '10px';
    imgBox.style.backgroundRepeat = 'no-repeat';
    imgBox.style.backgroundSize = '100% 100%';
  });

  imgBox.addEventListener('mouseover', (e) => {
    if (aid !== null) {
      logger.info(`over${e.screenX}`);
      changeVideoShot(aid, imgBox, e.screenX, imgUrl);
    }
  });

  imgBox.addEventListener('mousemove', (e) => {
    if (aid !== null) {
      logger.info(`move${e.screenX}`);
      changeVideoShot(aid, imgBox, e.screenX, imgUrl);
    }
  });
}
