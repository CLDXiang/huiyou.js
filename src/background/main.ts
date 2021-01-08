import handleMessage from './messageCallback';

// 点击弹出主页面
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('app.html'), active: true });
});

// 消息接收
chrome.runtime.onMessage.addListener(handleMessage);
