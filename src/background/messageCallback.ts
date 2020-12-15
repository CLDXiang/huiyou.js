/**
 * 处理 Content 发来的信息
 */
import { MessagePayloadMap, MessageResponseMap, MessageType } from '@/types/message';
import { postRecord } from './api';
import {
  getLastRecommendedVideo,
  getRecommendedVideo,
  getRecommendedVideoForcedly,
  recordVideoLocally,
} from './recordVideo';
import { addRecommendedHistory } from './storeRecommendedVideos';
import { getRemainingTime, startTimekeeping } from './timekeeping';

export default function handleMessage(
  message: {
    type: MessageType;
    payload: MessagePayloadMap[MessageType];
  },
  sender: chrome.runtime.MessageSender,
  sendResponse: <K extends MessageType>(response: MessageResponseMap[K]) => void,
) {
  switch (message.type) {
    case 'pauseVideo':
      {
        const payload = message.payload as MessagePayloadMap['pauseVideo'];
        recordVideoLocally(payload);
      }
      break;
    case 'fetchVideo':
      {
        const recommendedVideo = getRecommendedVideo();
        sendResponse<'fetchVideo'>(recommendedVideo);
        if (recommendedVideo !== null) {
          startTimekeeping();
          postRecord(recommendedVideo.bvid);
          addRecommendedHistory(recommendedVideo.bvid);
        }
      }
      break;
    case 'fetchVideoForcedly':
      getRecommendedVideoForcedly().then((recommendedVideo) => {
        sendResponse<'fetchVideoForcedly'>(recommendedVideo);
        if (recommendedVideo !== null) {
          startTimekeeping();
          postRecord(recommendedVideo.bvid);
          addRecommendedHistory(recommendedVideo.bvid);
        }
      });
      break;
    case 'synchronize':
      {
        const remainingTime = getRemainingTime();
        const lastRecommendedVideo = getLastRecommendedVideo();
        if (remainingTime === null || lastRecommendedVideo === null) {
          sendResponse(null);
        } else {
          sendResponse<'synchronize'>({ remainingTime, ...lastRecommendedVideo });
        }
      }
      break;
    default:
      break;
  }
  return true;
}
