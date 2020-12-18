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
}) => Promise<HonorItemType[]> = async ({ uid }) => {
  const resp = await recordRequest.getHonors({ uid });
  // FIXME: 暂时只加载前十条数据
  if (resp.data.length > 10) {
    resp.data.length = 10;
  }
  const parsedData = resp.data.map((item) => ({
    ...item,
    createdAt: dayjs(item.postime),
  }));
  return parsedData;
};

const recordClient = {
  /** 获取用户历史记录列表  */
  getRecords,
  /** 获取用户荣誉墙列表 */
  getHonors,
};

export default recordClient;
