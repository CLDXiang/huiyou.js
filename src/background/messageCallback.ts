/**
 * 处理 Content 发来的信息
 */
import { Message } from '@/types/message';
import fetchVideo from './fetchVideo';

export default function handleMessage(
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void,
) {
  switch (message.type) {
    case 'fetchVideo':
      fetchVideo().then((r) => sendResponse(r));
      break;
    default:
      break;
  }
  return true;
}
