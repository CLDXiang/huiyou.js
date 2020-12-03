/* eslint-disable @typescript-eslint/camelcase */
import { BILIBILI_LISTENED_URL } from '@/config';

/**
 * 验证是否为 “点赞” 请求，请求体的类型参照 `@/types/webRequest:LikeRequestBody`
 */
export function isLikeRequest(details: chrome.webRequest.WebRequestBodyDetails): boolean {
  if (details.url !== BILIBILI_LISTENED_URL.LIKE) return false;
  if (details.method !== 'POST') return false;
  const formData = details.requestBody?.formData;
  if (!formData) return false;

  return formData.like[0] === '1';
}

/**
 * 验证是否为 “收藏” 请求，请求体的类型参照 `@/types/webRequest:FavoriteRequestBody`
 */
export function isFavoriteRequest(details: chrome.webRequest.WebRequestBodyDetails): boolean {
  if (details.url !== BILIBILI_LISTENED_URL.FAVORITE) return false;
  if (details.method !== 'POST') return false;
  const formData = details.requestBody?.formData;
  if (!formData) return false;
  return formData.add_media_ids.length > 0;
}
