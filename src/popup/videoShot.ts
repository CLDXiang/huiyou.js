/* eslint-disable no-param-reassign */
import { VideoShot } from '@/types/video';
import { biliClient } from './bilibiliApi';
import { addStyle } from './utils';

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
    addStyle(videoPic, {
      backgroundImage: `url(${videoInfo.image[picIdx]}@85q.jpg`,
      backgroundPositionX: `${0 - 168 * (idx - (idx % videoInfo.img_x_len) * videoInfo.img_x_len)}px`,
      backgroundPositionY: `${10 - 84.5 * (idx % videoInfo.img_x_len)}$px`,
    });
  }
}
