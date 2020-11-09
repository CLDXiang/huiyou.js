/**
 * 处理 Content 发来的信息
 */
import { MessagePayloadMap, MessageResponseMap, MessageType } from '@/types/message';
import { recordRequest } from '@/apis';
import { getRecommendedVideo, recordVideoLocally } from './recordVideo';
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
    case 'playVideo':
      {
        const payload = message.payload as MessagePayloadMap['playVideo'];
        // TODO: 处理 playVideo 事件
      }
      break;
    case 'pauseVideo':
      {
        const payload = message.payload as MessagePayloadMap['pauseVideo'];
        recordVideoLocally(payload);
      }
      break;
    case 'fetchVideo':
      {
        const payload = message.payload as MessagePayloadMap['fetchVideo'];
        const recommendedVideo = getRecommendedVideo();
        sendResponse<'fetchVideo'>(recommendedVideo);
        if (recommendedVideo !== null) {
          startTimekeeping();
          recordRequest.postRecord({ uid: payload.uid, bvid: recommendedVideo.bvid });
        }
      }
      break;
    case 'synchronizeTime':
      {
        const remaining = getRemainingTime();
        sendResponse<'synchronizeTime'>(remaining);
      }
      break;
    default:
      break;
  }
  return true;
}
