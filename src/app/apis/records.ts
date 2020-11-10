import { recordRequest } from '@/apis';
import dayjs from 'dayjs';
import { RecordItem } from '../types';

/** 获取用户历史记录列表  */
const getRecords: (req: {
  /** 用户 uid */
  uid: string;
}) => Promise<RecordItem[]> = async ({ uid }) => {
  const resp = await recordRequest.searchRecords({ uid });
  const parsedData = resp.data.map((item) => ({
    bvid: item.bvid,
    createdAt: dayjs.unix(item.time),
  }));
  return parsedData;
};

const recordClient = {
  getRecords,
};

export default recordClient;
