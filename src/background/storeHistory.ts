/** 获取已推送过的视频的历史记录 */
export function getHistory(): Promise<Set<string>> {
  return new Promise((resolve) => {
    chrome.storage.sync.get('history', ({ history = [] }) => {
      resolve(new Set(history));
    });
  });
}

/** 向历史记录中添加新的视频 */
export async function addHistory(bvid: string) {
  const history = await getHistory();
  history.add(bvid);
  chrome.storage.sync.set({ history: [...history] });
}
