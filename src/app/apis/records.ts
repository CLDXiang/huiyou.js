import { recordRequest } from '@/apis';
import dayjs from 'dayjs';
import { RecordItem, HonorItemType } from '../types';

/** 获取用户历史记录列表  */
const getRecords: (req: {
  /** 用户 uid */
  uid: string;
}) => Promise<RecordItem[]> = async ({ uid }) => {
  const resp = await recordRequest.searchRecords({ uid });
  const parsedData = resp.data.map((item) => ({
    bvid: item.bvid,
    createdAt: dayjs(item.time),
  }));
  return parsedData;
};

/** 获取用户荣誉墙列表 */
const getHonors: (req: {
  /** 用户 uid */
  uid: string;
}) => Promise<HonorItemType[]> = async ({ uid }) => [
  // FIXME: mock data
  { bvid: 'BV1za411A7wR', createdAt: dayjs() },
  { bvid: 'BV1za411A7wR', createdAt: dayjs() },
  { bvid: 'BV1za411A7wR', createdAt: dayjs() },
  { bvid: 'BV1za411A7wR', createdAt: dayjs() },
];

const recordClient = {
  /** 获取用户历史记录列表  */
  getRecords,
  /** 获取用户荣誉墙列表 */
  getHonors,
};

export default recordClient;
