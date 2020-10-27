import logger from '@/utils/logger';
import { MessageResponseMap } from '@/types/message';
// import { MessagePayloadMap, MessageResponseMap, MessageType } from '@/types/message';
import { showVideo } from './showVideo';
import './popup.less';

logger.log('Link Start!');

/** 处理消息 */
// chrome.runtime.onMessage.addListener(handleMessage);

/** 监听网络请求。play paused 视频播放 窗口聚焦等操作 */
const bvid = window.location.href.match(/BV(.{10})/);
logger.info(bvid);
const uid = document.cookie.match(/(?:bp_video_offset_|im_notify_type_|bp_t_offset_)(\d+)/);
logger.info(uid);

// 视频播放
const media = document.querySelector('video');
export const play = {
  flag: 0,
  times: 0,
};

if (media != null) {
  // 认为可以推送视频的时候
  const pushMessage = {
    type: 'fetchVideo',
    payload: {
      uid,
    },
  };
  const pauseMessage = {
    type: 'pauseVideo',
    payload: {
      bvid,
      playedTime: media.currentTime, // 现在简单地认为duration就是播放时长
      totalDuration: media.duration,
    },
  };

  const focusMessage = {
    type: 'synchronizeTime',
    payload: {
      bvid,
      playedTime: media.currentTime, // 现在简单地认为duration就是播放时长
      totalDuration: media.duration,
    },
  };
  /** 监听play变量 */
  const playMessage = {
    type: 'playVideo',
    payload: { bvid },
  };

  const pushVideo = () => {
    // 如果打开多tabs的话以当前tab为准
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //  chrome.tabs.sendMessage(<number>(tabs[0].id),pushMessage,function(response){
    chrome.runtime.sendMessage(pushMessage, (response) => {
      logger.info('push message sent');
      logger.info(response);
      if (response !== null) {
        const payload = response.payload as MessageResponseMap['fetchVideo'];
        if (payload !== null) {
          logger.info('show video');
          showVideo(payload);
        }
      }
    });
  };

  // 有点问题 之后再说
  // Object.defineProperties(play,
  //   {
  //   'flag':{
  //     get: function(){
  //         return this._flag;
  //       },
  //     // configurable: true,
  //     set: function(newValue){
  //       if(this._flag == 1 && newValue == 0){
  //         if(this._times > 0){ // to modify
  //           this._times = 0;
  //           pushVideo();
  //         }
  //       }
  //       this._flag = newValue;
  //       logger.info('set flag:' + newValue);
  //     }
  //   },
  //   'times':{
  //     get: function(){
  //         return this._times;
  //       },
  //     // configurable: true,
  //     set: function(newValue){
  //       this._times = newValue;
  //     }
  //   },
  // });

  const playVideo = () => {
    if (play.flag !== 1) {
      pushVideo();
    }
  };

  media.addEventListener('play', () => {
    logger.info('Video Start');
    play.flag = 1;
    play.times += 1; // 播放次数 + 1
    // const video = fetchVideo(url);
    logger.info('send play message');
    chrome.runtime.sendMessage(playMessage, (reponse) => {
      logger.info('play message sent');
    });
  });
  // 视频停止
  media.addEventListener('pause', () => {
    logger.info('Video Paused');
    play.flag = 0;
    // const video = fetchVideo(url);
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
      logger.info('focus message sent');
    });

    if (play.flag !== 1) {
      pushVideo();
    }
  });
}
