import logger from '@/utils/logger';
import { MessageResponseMap, Message } from '@/types/message';
import { modifyRemainingTime, showVideo, initialVideo } from './showVideo';
import './popup.less';

logger.log('Link Start!');

/** 监听网络请求。play paused 视频播放 窗口聚焦等操作 */
const bvidArr = window.location.href.match(/BV(.{10})/);
const bvid = (bvidArr && bvidArr.length && bvidArr[1]) || null;
logger.info(`bvid: ${bvid}`);

const uidArr = document.cookie.match(/DedeUserID=([\d]+);/);
const uid = (uidArr && uidArr.length && uidArr[1]) || null;
logger.info(`uid: ${uid}`);

// 视频播放
const media = document.querySelector('video');
export const play = {
  flag: 0,
  times: 0,
};

// 初始化弹窗并隐藏
initialVideo();

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
    payload: { bvid },
  };

  const pushVideo = () => {
    // 如果打开多tabs的话以当前tab为准
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //  chrome.tabs.sendMessage(<number>(tabs[0].id),pushMessage,function(response){
    chrome.runtime.sendMessage(pushMessage, (response) => {
      logger.info('push message sent');
      // logger.info(response);
      if (response !== null) {
        const payload = response.payload as MessageResponseMap['fetchVideo'];
        if (payload !== null) {
          logger.info('show video');
          logger.info(payload);
          showVideo(response);
        }
      }
    });
  };

  media.addEventListener('play', () => {
    logger.info('Video Start');
    play.flag = 1;
    play.times += 1; // 播放次数 + 1
    // const video = fetchVideo(url);
    logger.info('send play message');
    chrome.runtime.sendMessage(playMessage, (response) => {
      logger.info('play message sent');
    });
  });
  // 视频停止
  media.addEventListener('pause', () => {
    logger.info('Video Paused');
    play.flag = 0;
    // const video = fetchVideo(url);
    pushVideo();
    chrome.runtime.sendMessage(pauseMessage, (response) => {
      logger.info('pause message sent');
    });
  });

  // 关闭窗口（视频停止）
  window.addEventListener('beforeunload', () => {
    logger.info('window closed');
    chrome.runtime.sendMessage(pauseMessage, (response) => {
      logger.info('unload message sent');
      logger.info(response);
    });
  });
  // 窗口聚焦
  window.addEventListener('focus', () => {
    logger.info('window focused');
    chrome.runtime.sendMessage(focusMessage, (response) => {
      logger.info('focus message sent', response);
      if (response !== null) {
        modifyRemainingTime(response);
      }
    });
  });
}
