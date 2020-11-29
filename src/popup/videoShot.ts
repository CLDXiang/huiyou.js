/* eslint-disable no-param-reassign */
import { VideoShot } from '@/types/video';
import { biliClient } from './apis/bilibili';
import { addStyle } from './utils';

export async function changeVideoShot(
  aid: number, videoPic: HTMLDivElement, x: number, videoInfo: VideoShot | null,
) {
  const picX = videoPic.getBoundingClientRect().left;
  const picWidth = videoPic.clientWidth;
  if (videoInfo === null) {
    // videoInfo = await fetchShot(aid);
    videoInfo = await biliClient.GetVideoShot({ aid });
  }
  if (videoInfo !== null) {
    const { imgXLen, imgYLen, image } = videoInfo;
    if (!imgXLen || !imgYLen || !image || !image.length) {
      return;
    }
    const idx = Math.round(((x - picX) / picWidth) * videoInfo.index.length);
    const picIdx = Math.round(idx / imgXLen / imgYLen);
    addStyle(videoPic, {
      backgroundImage: `url(${image[picIdx]}@85q.jpg`,
      backgroundPositionX: `${0 - 168 * (idx - (idx % imgXLen) * imgXLen)}px`,
      backgroundPositionY: `${10 - 84.5 * (idx % imgXLen)}$px`,
    });
  }
}
