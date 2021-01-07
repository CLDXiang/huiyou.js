import dayjs from 'dayjs';
import { RecordItem, RawRecordItem } from '../types';

/** 获取用户历史记录列表  */
const getRecords: (req: {
  /** 用户 uid */
  uid: string;
}) => Promise<RecordItem[]> = async ({ uid }) => {
  // FIXME: 从同步 storage 获取
  const resp: RawRecordItem[] = [];
  const parsedData = resp.map((item: RawRecordItem) => ({
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
