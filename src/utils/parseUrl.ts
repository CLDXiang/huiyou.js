/** 若 URL 为 '//' 开头，加上协议 */
const parseUrl = (url: string, prefix = 'https') => ((url && url.startsWith('//')) ? `${prefix}:${url}` : url);

export default parseUrl;
