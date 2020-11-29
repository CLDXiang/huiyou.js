/* eslint-disable @typescript-eslint/camelcase */
import { VideoShot } from '@/types/video';
import { biliRequest } from '@/apis';

const GetVideoShot: (req: {
  aid: number;
}) => Promise<VideoShot | null> = async ({ aid }) => {
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
  throw new Error('No Resp Data');
};

export const biliClient = {
  GetVideoShot,
};
