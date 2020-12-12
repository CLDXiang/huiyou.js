/** 若 URL 为 '//' 开头，加上协议 */
export function addProtocolBeforeUrl(url: string, protocol = 'https'): string {
  return url?.startsWith('//') ? `${protocol}:${url}` : url;
}

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

/**
 * 从 url 中提取参数值
 * @param url url
 * @param key 参数键名
 */
export function extractParamFromUrl(url: string, key: string) {
  return new URL(url, 'http://google.com').searchParams.get(key);
}
