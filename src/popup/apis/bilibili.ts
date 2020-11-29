/* eslint-disable @typescript-eslint/camelcase */
import { PlayVideoInfo, VideoShot } from '@/types/video';
import { biliRequest } from '@/apis';

export async function GetVideoShot(aid: number): Promise<VideoShot | null> {
  try {
    const resp = await biliRequest.getVideoShot({ aid });
    const rawData = resp.data.data;
    if (rawData) {
      const parsedData: VideoShot = {
        pvdata: rawData.pvdata,
        imgXLen: rawData.img_x_len,
        imgYLen: rawData.img_y_len,
        imgXSize: rawData.img_x_size,
        imgYSize: rawData.img_y_size,
        image: rawData.image,
        index: rawData.index,
      };
      return parsedData;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getVideoInfo(bvid: string): Promise<PlayVideoInfo | null> {
  try {
    const response = await biliRequest.getVideoInfo({ bvid });
    return response.data.data;
  } catch (error) {
    return null;
  }
}
