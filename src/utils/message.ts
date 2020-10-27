import { MessagePayloadMap, MessageResponseMap, MessageType } from '@/types/message';

/**
 * `chrome.runtime.sendMessage` 的类型强化后的封装
 * @param msgType 消息类型
 * @param payload 消息内容
 * @param callback 处理响应的回调函数
 */
export function sendMessage<K extends MessageType>(
  msgType: K,
  payload: MessagePayloadMap[K],
  callback?: (response: MessageResponseMap[K]) => void,
) {
  chrome.runtime.sendMessage(
    {
      type: msgType,
      payload,
    },
    callback,
  );
}
