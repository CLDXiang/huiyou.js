import { BILI_API } from '@/config';
import {
  GetVideoInfoParams,
  GetVideoInfoResponseBody,
} from '@/types/biliRequest';
import { biliAxios, AxiosResponsePromise } from './utils';

const { VIDEO_INFO_URL } = BILI_API;

/** 获取视频基本信息 */
export function getVideoInfo(
  params: GetVideoInfoParams,
): AxiosResponsePromise<GetVideoInfoResponseBody> {
  return biliAxios.get<GetVideoInfoResponseBody>(VIDEO_INFO_URL, { params });
}
