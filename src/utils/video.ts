/**
 * 从视频 url 中提取 av 号
 * @param arcurl 包含 av 号的完整 URL
 * @returns 以 `av` 开头的 av 号
 */
export function extractAvFromArcurl(arcurl: string): string | null {
  const match = new RegExp('http://www.bilibili.com/video/av(\\d+)').exec(arcurl);
  if (match === null) return null;
  return `av${match[1]}`;
}
