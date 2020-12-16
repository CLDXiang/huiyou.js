/** 若 URL 为 '//' 开头，加上协议 */
export function addProtocolBeforeUrl(url: string, protocol = 'https'): string {
  return url?.startsWith('//') ? `${protocol}:${url}` : url;
}

/**
 * 从 url 中提取参数值
 * @param url url
 * @param key 参数键名
 */
export function extractParamFromUrl(url: string, key: string) {
  return new URL(url, 'http://google.com').searchParams.get(key);
}
