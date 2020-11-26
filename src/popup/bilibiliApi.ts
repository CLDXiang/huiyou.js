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

export const biliClient = {
  GetVideoShot,
};
