import dayjs from 'dayjs';
import { getPushRecords } from '@/utils/pushRecords';
import { RecordItem } from '../types';

/** 获取用户历史记录列表  */
const getRecords: (req: {
  /** 用户 uid */
  uid: string;
}) => Promise<RecordItem[]> = async ({ uid }) => {
  const pushRecords = await getPushRecords();
  const pushRecordsByUid = pushRecords[uid] || [];
  const parsedData = pushRecordsByUid.map((item) => ({
    bvid: item.bvid,
    createdAt: dayjs(item.createdAt),
  }));
  return parsedData;
};

const recordClient = {
  /** 获取用户历史记录列表  */
  getRecords,
};

export default recordClient;
