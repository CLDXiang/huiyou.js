import { MessagePayloadMap } from '@/types/message';
import { PlayVideoInfo, VideoShot } from '@/types/video';
import logger from '@/utils/logger';
import { sendMessage } from '@/utils/message';
import './popup.less';
import { initialBox, initialVideo, showVideo } from './showVideo';
import { modifyRemainingTime, shutTimeKeeping } from './timeKeeper';
import { changeVideoShot } from './videoShot';
import { VideoProgress } from './videoProgress';

logger.log('DEBUG_MODE enabled!');

/** 监听网络请求。play paused 视频播放 窗口聚焦等操作 */
const bvidArr = window.location.href.match(/BV(.{10})/);
const bvid = bvidArr?.[1] ?? '';
logger.log(`bvid: ${bvid}`);

const uidArr = document.cookie.match(/DedeUserID=([\d]+);/);
const uid = uidArr?.[1] ?? null;
logger.log(`uid: ${uid}`);

// 视频播放
const media = document.querySelector('video');
let aid: number | null = null;
let vid: PlayVideoInfo | null = null;
let bvidGet: string | null = null; // 要推送的视频
let docUrl = '';
let imgUrl: VideoShot | null = null;

/** 视频进度监测器 */
const videoProgress = new VideoProgress();

// 初始化弹窗并隐藏
const box = initialBox();
const imgBox = initialVideo();

const getPayloads = (): MessagePayloadMap => ({
  pauseVideo: {
    bvid,
    playedTime: videoProgress.playedTime,
    totalDuration: videoProgress.duration,
  },
  fetchVideo: undefined,
  synchronize: undefined,
});

const pushVideo = () => {
  sendMessage('fetchVideo', getPayloads().fetchVideo, async (response) => {
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

// 视频停止
if (media !== null && uid !== null && bvid !== null) {
  media.addEventListener('pause', () => {
    logger.log('Video Paused');
    // const video = fetchVideo(url);
    pushVideo();
    sendMessage('pauseVideo', getPayloads().pauseVideo, () => {
      logger.log('pause message sent');
    });
  });
}

// 关闭窗口（视频停止）
window.addEventListener('beforeunload', () => {
  logger.log('window closed');
  if (media !== null && uid !== null && bvid !== '') {
    sendMessage('pauseVideo', getPayloads().pauseVideo, () => {
      logger.log('unload message sent');
      shutTimeKeeping(box);
    });
  }
});

// 失去焦点，需要关闭计时器
window.addEventListener('blur', () => {
  logger.log('window closed');
  if (media !== null && uid !== null && bvid !== '') {
    sendMessage('pauseVideo', getPayloads().pauseVideo, () => {
      logger.log('blur');
      shutTimeKeeping(box);
    });
  }
});

// 窗口聚焦 需要重启计时器
window.addEventListener('focus', () => {
  logger.log('window focused');
  logger.log(bvidGet);
  if (media !== null && uid !== null && bvid !== '') {
    sendMessage('synchronize', getPayloads().synchronize, async (response) => {
      logger.log('focus message sent', response);
      if (response !== null) {
        if (bvidGet !== response.bvid) {
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
        modifyRemainingTime(response.remainingTime, box);
      }
    });
  }
});

window.addEventListener('load', () => {
  logger.log('window load');
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
    changeVideoShot(aid, imgBox, e.screenX);
  }
});

imgBox.addEventListener('mousemove', (e) => {
  if (aid !== null) {
    logger.log(`move${e.screenX}`);
    changeVideoShot(aid, imgBox, e.screenX);
  }
});
