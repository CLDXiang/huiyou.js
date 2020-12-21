/** 播放量格式化 */
export function parsePlayedCount(cnt: number): string {
  if (typeof cnt !== 'number') {
    return '-';
  }
  if (cnt < 10000) {
    return cnt.toString();
  }
  if (cnt < 1e8) {
    return `${(cnt / 10000).toFixed(1)}万`;
  }
  return `${(cnt / 1e8).toFixed(1)}亿`;
}
