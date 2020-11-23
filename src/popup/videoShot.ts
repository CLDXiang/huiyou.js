/* eslint-disable no-param-reassign */
import axios from 'axios';
import { VideoShot } from '@/types/video';
import logger from '@/utils/logger';
import { GetVideoShotRequestBody } from '@/types/bilibiliApiRequest';
import { BILIBILI_DATA_API } from '@/config/bilibiliApi';

async function fetchShot(aid: number):Promise<VideoShot | null> {
  const url = BILIBILI_DATA_API.BASE_URL + BILIBILI_DATA_API.VIDEO_SHOT_URL;
  const response = await axios.get<GetVideoShotRequestBody>(`${url}?index=1&aid=${aid}`);
  if (response.status !== 200) {
    return null;
  }
  const { data } = response;
  logger.info(data);
  if (data.data === null) {
    return data.data;
  } return data.data;
}
// eslint-disable-next-line max-len
export async function changeVideoShot(aid: number, videoPic: HTMLDivElement, x: number, videoInfo: VideoShot | null) {
  const picX = videoPic.getBoundingClientRect().left;
  const picWidth = videoPic.clientWidth;
  if (videoInfo === null) {
    videoInfo = await fetchShot(aid);
  }
  if (videoInfo !== null && videoInfo.image.length !== 0) {
    const idx = Math.round(((x - picX) / picWidth) * videoInfo.index.length);
    const picIdx = Math.round(idx / videoInfo.img_x_len / videoInfo.img_y_len);
    logger.info(`picX:${picX} picWidth:${picWidth} idx: ${idx}  picIdx: ${picIdx}`);
    logger.info(`${videoInfo.image[picIdx]}, image_list: ${videoInfo.image}`);
    videoPic.style.backgroundImage = `url(${videoInfo.image[picIdx]}@85q.jpg)`;
    videoPic.style.backgroundPositionX = `${0 - 168 * (idx - (idx % videoInfo.img_x_len) * videoInfo.img_x_len)}px`; // TODO
    videoPic.style.backgroundPositionY = `${10 - 84.5 * (idx % videoInfo.img_x_len)}$px`;
    logger.info(videoPic.style);
    logger.info(`X: ${videoPic.style.backgroundPositionX}`);
    logger.info(`X: ${videoPic.style.backgroundPositionY}`);
  }
}
