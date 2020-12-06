import { BILIBILI_DATA_API } from '@/config';
import {
  GetVideoInfoParams,
  GetVideoInfoResponseBody,
  GetVideoShotParams,
  GetVideoShotResponseBody,
} from '@/types/bilibiliApiRequest';
import { biliAxios, AxiosResponsePromise } from './utils';

const { VIDEO_INFO_URL, VIDEO_SHOT_URL } = BILIBILI_DATA_API;

/** 获取视频基本信息 */
export function getVideoInfo(
  params: GetVideoInfoParams,
): AxiosResponsePromise<GetVideoInfoResponseBody> {
  return biliAxios.get<GetVideoInfoResponseBody>(VIDEO_INFO_URL, { params });
}

export function getVideoShot(
  params: GetVideoShotParams,
): AxiosResponsePromise<GetVideoShotResponseBody> {
  return biliAxios.get<GetVideoShotResponseBody>(VIDEO_SHOT_URL, { params });
}
