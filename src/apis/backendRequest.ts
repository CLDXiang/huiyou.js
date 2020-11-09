import { BACKEND } from '@/config';
import {
  CreateRecordRequestBody,
  NextRecommendedVideoRequestParam,
  NextRecommendedVideoResponseBody,
  ReportEventsBody,
  SearchRecordsRequestParam,
  SearchRecordsResponseBody,
} from '@/types/backendRequest';
import axios, { AxiosResponse } from 'axios';

const { BASE_URL, RECORD_URL, VIDEO_URL } = BACKEND;

const backend = axios.create({
  baseURL: BASE_URL,
});

/** 向后端报告视频推送信息 */
export function postRecord(body: CreateRecordRequestBody) {
  backend.post(RECORD_URL, body);
}

/** 从后端获取视频推送记录 */
export function searchRecords(
  params: SearchRecordsRequestParam,
): Promise<AxiosResponse<SearchRecordsResponseBody>> {
  return backend.get<SearchRecordsResponseBody>(RECORD_URL, { params });
}

/** 向后端报告点赞投币等事件 */
export function reportEvents(body: ReportEventsBody) {
  backend.patch(VIDEO_URL, body);
}

/** 从推荐链获取下一个推荐的视频 */
export function getNextRecommendedVideo(
  params: NextRecommendedVideoRequestParam,
): Promise<AxiosResponse<NextRecommendedVideoResponseBody>> {
  return backend.get<NextRecommendedVideoResponseBody>(VIDEO_URL, { params });
}
