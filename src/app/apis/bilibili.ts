import { biliRequest } from '@/apis';
import dayjs, { Dayjs } from 'dayjs';
import parseUrl from '@/utils/parseUrl';
import { RecordDetailItem } from '../types';

/** 获取视频详细信息  */
const getVideoInfo: (req: {
  /** 视频 BV 号 */
  bvid: string;
  /** 创建时间 */
  createdAt: Dayjs;
}) => Promise<RecordDetailItem> = async ({ bvid, createdAt }) => {
  const resp = await biliRequest.getVideoInfo({ bvid });
  const rawData = resp.data.data;
  if (rawData) {
    const parsedData: RecordDetailItem = {
      ...rawData,
      createdAt,
      pubdate: dayjs.unix(rawData.pubdate),
      ctime: dayjs.unix(rawData.ctime),
      pic: parseUrl(rawData.pic),
      owner: {
        ...rawData.owner,
        face: parseUrl(rawData.owner.face),
      },
      stat: {
        ...rawData.stat,
        nowRank: rawData.stat.now_rank,
        hisRank: rawData.stat.his_rank,
      },
    };
    return parsedData;
  }
  throw new Error('No Resp Data');
};

const biliClient = {
  getVideoInfo,
};

export default biliClient;
