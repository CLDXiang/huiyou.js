/**
 * 处理 Content 发来的信息
 */
import { MessagePayloadMap, MessageResponseMap, MessageType } from '@/types/message';
import { postRecord } from './api';
import VideoRecorder from './recordVideo';
import { addRecommendedHistory } from './storeRecommendedVideos';

const videoRecorder = new VideoRecorder();

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
        videoRecorder.addVideo(payload);
        sendResponse<'pauseVideo'>(null);
      }
      break;
    case 'fetchVideo':
      videoRecorder.getRecommendedVideo().then((video) => {
        sendResponse<'fetchVideo'>(video);
        if (video !== null) {
          postRecord(video.bvid);
          addRecommendedHistory(video.bvid);
        }
      });
      break;
    case 'fetchVideoForcedly':
      videoRecorder.getRecommendedVideo(true).then((video) => {
        sendResponse<'fetchVideoForcedly'>(video);
        if (video !== null) {
          postRecord(video.bvid);
          addRecommendedHistory(video.bvid);
        }
      });
      break;
    case 'synchronize':
      {
        const lastVideoAndRemainingTime = videoRecorder.getLastVideoAndRemainingTime();
        if (lastVideoAndRemainingTime === null) {
          sendResponse<'synchronize'>(null);
        } else {
          const { video, remainingTime } = lastVideoAndRemainingTime;
          sendResponse<'synchronize'>({ remainingTime, ...video });
        }
      }
      break;
    case 'close':
      videoRecorder.stopTimekeeping();
      break;
    default:
      break;
  }
  return true;
}
