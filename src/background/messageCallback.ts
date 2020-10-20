/**
 * 处理 Content 发来的信息
 */
import { MessagePayloadMap, MessageResponseMap, MessageType } from '@/types/message';

export default function handleMessage(
  message: {
    type: MessageType;
    payload: MessagePayloadMap[MessageType];
  },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: MessageResponseMap[MessageType]) => void,
) {
  switch (message.type) {
    case 'playVideo':
      {
        const payload = message.payload as MessagePayloadMap['playVideo'];
      }
      break;
    default:
      break;
  }
  return true;
}
