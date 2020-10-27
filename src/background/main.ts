import handleMessage from './messageCallback';
import {
  beforeRequestHandler,
  requestCompletedHandler,
  requestErrorhandler,
  requestFilter,
} from './webRequestListener';

// 点击弹出主页面
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html'), active: true });
});

// 消息接收
chrome.runtime.onMessage.addListener(handleMessage);

// 监听网络请求。处理点赞、收藏等操作
chrome.webRequest.onBeforeRequest.addListener(beforeRequestHandler, requestFilter, ['requestBody']);

chrome.webRequest.onCompleted.addListener(requestCompletedHandler, requestFilter);

chrome.webRequest.onErrorOccurred.addListener(requestErrorhandler, requestFilter);
