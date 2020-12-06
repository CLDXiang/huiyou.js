/* eslint-disable no-param-reassign */
import { VideoShot } from '@/types/video';
import logger from '@/utils/logger';
import { biliClient } from './apis';
import { addStyle } from './utils';

let videoInfo: VideoShot | null = null;
let vidAid: number | null = null;

export async function changeVideoShot(
  aid: number, videoPic: HTMLDivElement, x: number,
) {
  const picX = videoPic.getBoundingClientRect().left;
  const picWidth = videoPic.clientWidth;
  if (videoInfo === null || vidAid !== aid) {
    // videoInfo = await fetchShot(aid);
    videoInfo = await biliClient.GetVideoShot(aid);
    vidAid = aid;
  }
  if (videoInfo !== null) {
    logger.log('video info not null', aid, '  local:', vidAid);
    const {
      imgXLen, imgYLen, image, imgXSize, imgYSize,
    } = videoInfo;
    logger.log(videoInfo);
    if (!imgXLen || !imgYLen || !image || !image.length || !imgXSize || !imgYSize) {
      return;
    }
    let idx = 0;
    if (videoInfo.index.length === 0) {
      logger.log('len 0');
      idx = Math.round(((x - picX) / picWidth) * imgXLen);
    } else {
      idx = Math.round(((x - picX) / picWidth) * videoInfo.index.length);
    }
    const picIdx = Math.round(idx / imgXLen / imgYLen);
    addStyle(videoPic, {
      backgroundImage: `url(${image[picIdx]}@85q.jpg`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '1410px',
      backgroundPositionX: `${0 - 141 * (idx - Math.floor(idx / imgXLen) * imgXLen)}px`,
      backgroundPositionY: `${10 - 79.3125 * Math.floor((idx / imgXLen))}px`,
    });
    logger.log('add style');
    logger.log(`y: ${Math.floor((idx / imgXLen))} x: ${(idx - Math.floor(idx / imgXLen) * imgXLen)} $X: ${0 - 168 * (idx - (idx % imgXLen) * imgXLen)}px Y:${10 - 84.5 * (idx % imgXLen)}px`);
    logger.log(`X: ${videoPic.style.backgroundPositionX} Y: ${videoPic.style.backgroundPositionY}`);
  }
}
