import { MessagePayloadMap } from '@/types/message';
import logger from '@/utils/logger';
import { sendMessage } from '@/utils/message';
import { Bubble } from './bubble';
import { Popup } from './popup';
import './popup.less';
import { shutTimeKeeping, startTimekeeping } from './timeKeeper';
import { VideoProgress } from './videoProgress';
import { changeVideoShot } from './videoShot';

logger.log('DEBUG_MODE enabled!');

// 监听网络请求。play paused 视频播放 窗口聚焦等操作
/** 当前页面 bv号 */
const bvid = document.URL.match(/BV(.{10})/)?.[1] ?? '';

/** 当前用户 uid */
const uid = document.cookie.match(/DedeUserID=([\d]+);/)?.[1] ?? null;
logger.log({ bvid, uid });

/** 视频进度监测器 */
const videoProgress = new VideoProgress();

// 初始化弹窗和气泡
const popup = new Popup();
const bubble = new Bubble();

/** 获取消息 payload */
const getPayloads = (): MessagePayloadMap => ({
  pauseVideo: {
    bvid,
    playedTime: videoProgress.playedTime,
    totalDuration: videoProgress.duration,
  },
  fetchVideo: undefined,
  synchronize: undefined,
  fetchVideoForcedly: undefined,
});

/** 向后台拉取视频 */
const fetchVideo = () => {
  sendMessage('fetchVideo', getPayloads().fetchVideo, async (resp) => {
    if (resp?.bvid) {
      // 后台有可推送视频
      await popup.showVideo(resp.bvid);
      if (popup.video) {
        startTimekeeping();
      }
    }
  });
};

/** 主动推送 */
const directPush = () => {
  sendMessage('fetchVideoForcedly', getPayloads().fetchVideoForcedly, async (resp) => {
    if (resp?.bvid) {
      // 后台要求推送视频
      await popup.showVideo(resp.bvid);
      if (popup.video) {
        startTimekeeping();
      }
    }
  });
};
// 绑定气泡事件
bubble.handleClick(directPush);

// 视频停止
if (videoProgress.element && uid && bvid) {
  videoProgress.element.addEventListener('pause', () => {
    logger.log('video paused');
    sendMessage('pauseVideo', getPayloads().pauseVideo, () => {
      fetchVideo();
    });
  });
}

// 关闭窗口（视频停止）
window.addEventListener('beforeunload', () => {
  logger.log('window closed');
  if (videoProgress.element && uid && bvid) {
    sendMessage('pauseVideo', getPayloads().pauseVideo, () => {
      shutTimeKeeping();
    });
  }
});

// 失去焦点，需要关闭计时器
window.addEventListener('blur', () => {
  logger.log('window blur');
  if (videoProgress.element && uid && bvid) {
    sendMessage('pauseVideo', getPayloads().pauseVideo, () => {
      shutTimeKeeping();
    });
  }
});

// 窗口聚焦 需要重启计时器
window.addEventListener('focus', () => {
  logger.log('window focused');
  if (uid) {
    sendMessage('synchronize', getPayloads().synchronize, async (resp) => {
      if (resp) {
        if (resp.bvid && popup.video?.bvid !== resp.bvid) {
          // 如果当前页面弹窗视频与同步信息不符，覆盖当前页面
          await popup.showVideo(resp.bvid);
        }
        // modifyRemainingTime(resp.remainingTime);
      } else {
        popup.hidePopup();
      }
    });
  }
});

window.addEventListener('load', () => {
  logger.log('window load');
  if (uid) {
    sendMessage('synchronize', getPayloads().synchronize, async (resp) => {
      if (resp) {
        if (resp.bvid && popup.video?.bvid !== resp.bvid) {
          // 如果当前页面弹窗视频与同步信息不符，覆盖当前页面
          await popup.showVideo(resp.bvid);
        }
        // modifyRemainingTime(resp.remainingTime);
      } else {
        popup.hidePopup();
      }
    });
  }
});

// imgBox.addEventListener('mouseleave', () => {
//   logger.log(docUrl);
//   imgBox.style.backgroundImage = `url(${docUrl})`;
//   logger.log(`mouse leave${imgBox.style.backgroundImage}`);
//   imgBox.style.backgroundPositionX = '0px';
//   imgBox.style.backgroundPositionY = '10px';
//   imgBox.style.backgroundRepeat = 'no-repeat';
//   imgBox.style.backgroundSize = '100% 100%';
// });

// imgBox.addEventListener('mouseover', (e) => {
//   if (aid !== null) {
//     logger.log(`over${e.screenX}`);
//     changeVideoShot(aid, imgBox, e.screenX);
//   }
// });

// imgBox.addEventListener('mousemove', (e) => {
//   if (aid !== null) {
//     logger.log(`move${e.screenX}`);
//     changeVideoShot(aid, imgBox, e.screenX);
//   }
// });
