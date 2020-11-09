import { BACKEND } from '@/config';
import {
  CreateRecordRequestBody,
  SearchRecordsRequestParam,
  SearchRecordsResponseBody,
} from '@/types/backendRequest';
import backend, { AxiosResponsePromise } from './utils';

const { RECORD_URL } = BACKEND;

/** 向后端报告视频推送信息 */
export function postRecord(body: CreateRecordRequestBody) {
  backend.post(RECORD_URL, body);
}

/** 从后端获取视频推送记录 */
export function searchRecords(
  params: SearchRecordsRequestParam,
): AxiosResponsePromise<SearchRecordsResponseBody> {
  return backend.get<SearchRecordsResponseBody>(RECORD_URL, { params });
}
