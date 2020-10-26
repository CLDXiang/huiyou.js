import axios from 'axios';

/** 推送视频后端返回 */
export interface PushRecord {
  uid: string;
  /** BV 号 */
  bv: string;
  /** 作者 */
  author: string;
  /** 预览图片 */
  pic: string;
  /** 更新时间 */
  pubdate: string;
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
}

const getRecords: () => Promise<PushRecord[]> = () =>
  new Promise<PushRecord[]>((resolve, reject) => {
    axios
      .get('/api/records')
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const httpClient = {
  getRecords,
};

export default httpClient;
