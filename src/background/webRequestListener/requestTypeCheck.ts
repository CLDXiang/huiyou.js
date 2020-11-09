/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { bilibiliApiUrl } from '@/config';

/**
 * 验证是否为 “点赞” 请求，请求体的类型参照 `@/types/webRequest:LikeRequestBody`
 */
export function isLikeRequest(details: chrome.webRequest.WebRequestBodyDetails): boolean {
  if (details.url !== bilibiliApiUrl.like) return false;
  if (details.method !== 'POST') return false;
  const formData = details.requestBody?.formData;
  if (!formData) return false;

  return formData.like[0] === '1';
}

/**
 * 验证是否为 “收藏” 请求，请求体的类型参照 `@/types/webRequest:FavoriteRequestBody`
 */
export function isFavoriteRequest(details: chrome.webRequest.WebRequestBodyDetails): boolean {
  if (details.url !== bilibiliApiUrl.favorite) return false;
  if (details.method !== 'POST') return false;
  const formData = details.requestBody?.formData;
  if (!formData) return false;
  return formData.add_media_ids.length > 0;
}
