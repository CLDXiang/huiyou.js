import { BACKEND } from '@/config';
import {
  CreateRecordRequestBody,
  SearchRecordsRequestParams,
  SearchRecordsResponseBody,
} from '@/types/backendRequest';
import { backendAxios, AxiosResponsePromise } from './utils';

const { RECORD_URL } = BACKEND;

/** 向后端报告视频推送信息 */
export function postRecord(body: CreateRecordRequestBody) {
  backendAxios.post(RECORD_URL, body);
}

/** 从后端获取视频推送记录 */
export function searchRecords(
  params: SearchRecordsRequestParams,
): AxiosResponsePromise<SearchRecordsResponseBody> {
  return backendAxios.get<SearchRecordsResponseBody>(RECORD_URL, { params });
}
