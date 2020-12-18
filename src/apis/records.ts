import { BACKEND } from '@/config';
import {
  CreateRecordRequestBody,
  SearchRecordsRequestParams,
  SearchRecordsResponseBody,
  NextRecommendedVideoRequestParam,
  HonorsResponseBody,
} from '@/types/backendRequest';
import { backendAxios, AxiosResponsePromise } from './utils';

const { RECORD_URL, CHART_URL } = BACKEND;

/** 向后端报告视频推送信息 */
export async function postRecord(body: CreateRecordRequestBody) {
  await backendAxios.post(RECORD_URL, body);
}

/** 从后端获取视频推送记录 */
export function searchRecords(
  params: SearchRecordsRequestParams,
): AxiosResponsePromise<SearchRecordsResponseBody> {
  return backendAxios.get<SearchRecordsResponseBody>(RECORD_URL, { params });
}

/** 从后端获取用户榜单 */
export function getHonors(
  params: NextRecommendedVideoRequestParam,
): AxiosResponsePromise<HonorsResponseBody> {
  return backendAxios.get<HonorsResponseBody>(CHART_URL, { params });
}
