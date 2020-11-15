import { reportEvents } from '@/apis/videos';
import { VideoEvent } from '@/types/backendRequest';
import { FavoriteRequestBody, LikeRequestBody } from '@/types/bilibiliApiRequest';
import { getBvidAndPlay } from '../api';
import { isFavoriteRequest, isLikeRequest } from './requestTypeCheck';

export const requestFilter: chrome.webRequest.RequestFilter = {
  urls: ['https://api.bilibili.com/*'],
  types: ['xmlhttprequest'],
};

interface RequestInfo {
  event: VideoEvent;
  aid: string;
}

// 记录网络请求的 id 及其类型
const requests = new Map<string, RequestInfo>();

// 在发起请求时记录请求类型（收藏、点赞等）
export function beforeRequestHandler(details: chrome.webRequest.WebRequestBodyDetails) {
  if (isLikeRequest(details)) {
    const body = details.requestBody as LikeRequestBody;
    requests.set(details.requestId, { event: 'like', aid: body.formData.aid[0] });
  } else if (isFavoriteRequest(details)) {
    const body = details.requestBody as FavoriteRequestBody;
    requests.set(details.requestId, { event: 'favorite', aid: body.formData.rid[0] });
  }
}

// 请求成功结束，清除记录
export async function requestCompletedHandler(details: chrome.webRequest.WebResponseCacheDetails) {
  const requestInfo = requests.get(details.requestId);
  requests.delete(details.requestId);

  if (!requestInfo) return;
  const bvidAndPlay = await getBvidAndPlay(requestInfo.aid);
  if (!bvidAndPlay) return;

  reportEvents({
    event: requestInfo.event,
    bvid: bvidAndPlay.bvid,
    play: bvidAndPlay.play,
  });
}

// 请求失败，清除记录
export function requestErrorhandler(details: chrome.webRequest.WebResponseErrorDetails) {
  requests.delete(details.requestId);
}
