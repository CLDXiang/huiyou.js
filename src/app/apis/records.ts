import { recordRequest } from '@/apis';
import dayjs from 'dayjs';
import { RecordItem } from '../types';

/** 获取用户历史记录列表  */
const getRecords: (req: {
  /** 用户 uid */
  uid: string;
}) => Promise<RecordItem[]> = ({ uid }) =>
  new Promise<RecordItem[]>((resolve, reject) => {
    recordRequest.searchRecords({ uid })
      .then((resp) => {
        // TODO: 按照 createdAt 降序排序
        const parsedData = resp.data.map((item) => ({
          bvid: item.bvid,
          createdAt: dayjs.unix(item.time),
        }));
        resolve(parsedData);
      })
      .catch((err) => reject(err));
  });

const recordClient = {
  getRecords,
};

export default recordClient;
