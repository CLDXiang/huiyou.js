/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */

function isAvStrArray(aid: any): boolean {
  return aid && aid.length === 1 && typeof aid[0] === 'string';
}

/**
 * 验证是否为 “点赞” 请求，请求体的类型参照 `@/types/webRequest:LikeRequestBody`
 */
export function isLikeRequest(details: chrome.webRequest.WebRequestBodyDetails): boolean {
  if (details.method !== 'POST') return false;
  const formData = details.requestBody?.formData;
  if (!formData) return false;

  const { aid, like } = formData;
  if (!isAvStrArray(aid)) return false;
  if (like?.length !== 1 || like[0] !== '1') return false;
  return true;
}

/**
 * 验证是否为 “收藏” 请求，请求体的类型参照 `@/types/webRequest:FavoriteRequestBody`
 */
export function isFavoriteRequest(details: chrome.webRequest.WebRequestBodyDetails): boolean {
  if (details.method !== 'POST') return false;
  const formData = details.requestBody?.formData;
  if (!formData) return false;

  const { rid, add_media_ids } = formData;
  if (!isAvStrArray(rid)) return false;
  return Array.isArray(add_media_ids) && typeof add_media_ids[0] === 'string';
}
