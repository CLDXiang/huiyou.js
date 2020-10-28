/**
 * 处理 Content 发来的信息
 */
import { MessagePayloadMap, MessageResponseMap, MessageType } from '@/types/message';
import logger from '@/utils/logger';
import { postRecord } from './backend';
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
  logger.info('message handler');
  switch (message.type) {
    case 'playVideo':
      {
        logger.info('play receive');
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
        logger.info('fetch receive');
        const payload = message.payload as MessagePayloadMap['fetchVideo'];
        const recommendedVideo = getRecommendedVideo();
        sendResponse<'fetchVideo'>(recommendedVideo);
        if (recommendedVideo !== null) {
          logger.info(`recommend video${recommendedVideo.title}${recommendedVideo.bvid}`);
          startTimekeeping();
          postRecord(payload.uid, recommendedVideo);
        }
      }
      break;
    case 'synchronizeTime':
      {
        logger.info('sychronize done');
        const remaining = getRemainingTime();
        sendResponse<'synchronizeTime'>(remaining);
      }
      break;
    default:
      break;
  }
  return true;
}
