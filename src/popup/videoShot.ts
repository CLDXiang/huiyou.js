/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-param-reassign */
// import axios from 'axios';
import { VideoShot } from '@/types/video';
import logger from '@/utils/logger';
import { biliRequest } from '@/apis';

/** 获取视频详细信息  */
const GetVideoShot: (req: {
  aid: number;
}) => Promise<VideoShot | null> = async ({ aid }) => {
  const resp = await biliRequest.getVideoShot({ aid });
  const rawData = resp.data.data;
  if (rawData) {
    const parsedData: VideoShot = {
      ...rawData,
      pvdata: rawData.pvdata,
      img_x_len: rawData.img_x_len,
      img_y_len: rawData.img_y_len,
      img_x_size: rawData.img_x_size,
      img_y_size: rawData.img_y_size,
      image: rawData.image,
      index: rawData.index,
    };
    return parsedData;
  }
  throw new Error('No Resp Data');
};

const biliClient = {
  GetVideoShot,
};

// eslint-disable-next-line max-len
export async function changeVideoShot(aid: number, videoPic: HTMLDivElement, x: number, videoInfo: VideoShot | null) {
  const picX = videoPic.getBoundingClientRect().left;
  const picWidth = videoPic.clientWidth;
  if (videoInfo === null) {
    // videoInfo = await fetchShot(aid);
    videoInfo = await biliClient.GetVideoShot({ aid });
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
