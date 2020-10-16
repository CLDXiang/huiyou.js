// 点击弹出主页面
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: `${chrome.runtime.getURL('app/app.html')}`, active: true });
});

// 消息接收
chrome.runtime.onMessage.addListener((request, sender) => {
  // if (request.type === 'insert_popup_css') {
  //   if (sender.tab && sender.tab.id) {
  //     chrome.tabs.insertCSS(sender.tab.id, {
  //       file: '/css/popup.css',
  //       allFrames: true,
  //       runAt: 'document_end',
  //     });
  //   }
  // }
});
