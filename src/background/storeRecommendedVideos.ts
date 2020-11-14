/** 获取已推荐过的视频的历史记录 */
export function getRecommendedHistory(): Promise<Set<string>> {
  return new Promise((resolve) => {
    chrome.storage.local.get('history', ({ history = [] }) => {
      resolve(new Set(history));
    });
  });
}

/** 向历史记录中添加新的视频 */
export async function addRecommendedHistory(bvid: string) {
  const history = await getRecommendedHistory();
  history.add(bvid);
  chrome.storage.local.set({ history: [...history] });
}
