import { MessagePayloadMap } from '@/types/message';
import logger from '@/utils/logger';
import { sendMessage } from '@/utils/message';
import TimeKeeper from '@/utils/timeKeeper';
import { TIMEKEEPING } from '@/config';
import { Bubble } from './bubble';
import { Popup } from './popup';
import './popup.less';
import { VideoProgress } from './videoProgress';

logger.log('DEBUG_MODE enabled!');

// 页面初始化
/** 当前页面 bv号 */
const bvid = document.URL.match(/BV(.{10})/)?.[1] ?? '';
/** 当前用户 uid */
const uid = document.cookie.match(/DedeUserID=([\d]+);/)?.[1] ?? null;
logger.log({ bvid, uid });
/** 视频进度监测器 */
const videoProgress = new VideoProgress();
/** 弹窗 */
const popup = new Popup();
/** 气泡 */
const bubble = new Bubble();
/** 计时器 */
let timeKeeper: TimeKeeper | null = null;

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
  close: undefined,
});

// 处理关闭弹窗
popup.onClose((e) => {
  e.stopPropagation();
  popup.hidePopup();
  popup.resetPopup();
  sendMessage('close', getPayloads().close);
  if (timeKeeper) {
    timeKeeper.stop();
    timeKeeper = null;
  }
});

/** 获取到后台推送的视频 */
const handleVideoFetched = async (bvidToShow?: string) => {
  if (bvidToShow) {
    // 后台有可推送视频
    await popup.showVideo(bvidToShow);
    if (popup.video) {
      if (timeKeeper) {
        // 如果仍在计时，清空计时器
        timeKeeper.stop();
      }
      // 启动计时器
      timeKeeper = new TimeKeeper(TIMEKEEPING.DURATION, () => popup.resetPopup());
    }
  }
};

/** 向后台拉取视频 */
const fetchVideo = () => {
  sendMessage('fetchVideo', getPayloads().fetchVideo, async (resp) => {
    logger.log('fetchVideo', { resp });
    handleVideoFetched(resp?.bvid);
  });
};

/** 主动推送 */
const directPush = () => {
  sendMessage('fetchVideoForcedly', getPayloads().fetchVideoForcedly, async (resp) => {
    handleVideoFetched(resp?.bvid);
  });
};
// 绑定气泡事件
bubble.handleClick(directPush);

// 视频暂停
if (videoProgress.element && bvid) {
  videoProgress.element.addEventListener('pause', () => {
    logger.log('video paused');
    sendMessage('pauseVideo', getPayloads().pauseVideo, () => {
      logger.log('DEBUG: get resp');
      fetchVideo();
    });
  });
}

/** 页面失焦的回调 */
const handleTabBlur = () => {
  if (videoProgress.element && bvid) {
    sendMessage('pauseVideo', getPayloads().pauseVideo, () => {
      if (timeKeeper) {
        // 清空计时器
        timeKeeper.stop();
        timeKeeper = null;
      }
    });
  }
};

// 关闭窗口（视频停止）
window.addEventListener('beforeunload', () => {
  logger.log('window closed');
  handleTabBlur();
});

// 失去焦点，需要关闭计时器
window.addEventListener('blur', () => {
  logger.log('window blur');
  handleTabBlur();
});

/** 页面获得焦点的回调 */
const handleTabFocused = () => {
  sendMessage('synchronize', getPayloads().synchronize, async (resp) => {
    if (resp) {
      if (resp.bvid && popup.video?.bvid !== resp.bvid) {
        // 如果当前页面弹窗视频与同步信息不符，覆盖当前页面
        await popup.showVideo(resp.bvid);
        if (popup.video) {
          if (timeKeeper) {
            // 如果仍在计时，清空计时器
            timeKeeper.stop();
          }
          // 重启计时器
          timeKeeper = new TimeKeeper(resp.remainingTime, () => popup.resetPopup());
        }
      }
    } else {
      popup.hidePopup();
      popup.resetPopup();
      if (timeKeeper) {
        timeKeeper.stop();
        timeKeeper = null;
      }
    }
  });
};

// 窗口聚焦
window.addEventListener('focus', () => {
  logger.log('window focused');
  handleTabFocused();
});

// 加载窗口
window.addEventListener('load', () => {
  logger.log('window load');
  handleTabFocused();
});
