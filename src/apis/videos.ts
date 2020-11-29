import { BACKEND } from '@/config';
import {
  NextRecommendedVideoRequestParam,
  NextRecommendedVideoResponseBody,
  ReportEventsBody,
} from '@/types/backendRequest';
import { backendAxios, AxiosResponsePromise } from './utils';

const { VIDEO_URL } = BACKEND;

/** 向后端报告点赞投币等事件 */
export async function reportEvents(body: ReportEventsBody) {
  await backendAxios.patch(VIDEO_URL, body);
}

/** 从推荐链获取下一个推荐的视频 */
export function getNextRecommendedVideo(
  params: NextRecommendedVideoRequestParam,
): AxiosResponsePromise<NextRecommendedVideoResponseBody> {
  return backendAxios.get<NextRecommendedVideoResponseBody>(VIDEO_URL, { params });
}
