import axios from 'axios';
import { API_URL } from '@/utils/config';

/** 推送视频后端返回 */
export interface RecordItem {
  /** 用户 Id */
  uid: string;
  /** BV 号 */
  bvid: string;
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

interface GetRecordRespItem {
  /** 用户 Id */
  uid: string;
  /** BV 号（以 'BV' 开头） */
  bvid: string;
  arcrank: string;
  arcurl: string;
  /** up 主 */
  author: string;
  badgepay: number;
  /** 简介 */
  description: string;
  /** 时长/秒 */
  duration: string;
  /** 收藏 */
  favorites: string;
  is_pay: number;
  is_union_video: number;
  mid: number;
  /** 缩略图 URL */
  pic: string;
  /** 播放量 */
  play: string;
  /** 发布日期 */
  pubdate: string;
  rank_offset: number;
  rank_index: number;
  rank_score: number;
  review: number;
  senddate: number;
  /** 标签，多个标签用中文逗号分隔 */
  tag: string;
  /** 标题 */
  title: string;
  /** 视频为 video */
  type: string;
  video_review: number;
}

type GetRecordResp = GetRecordRespItem[];

const getRecords: () => Promise<RecordItem[]> = () =>
  new Promise<RecordItem[]>((resolve, reject) => {
    axios
      .get<GetRecordResp>(`${API_URL}/records`)
      .then((resp) => {
        const parsedData = resp.data.map((item) => ({
          ...item,
          /** 若为 '//' 开头，加上协议 */
          pic: (item.pic && item.pic.startsWith('//')) ? `https:${item.pic}` : item.pic,
        }));
        resolve(parsedData);
      })
      .catch((err) => reject(err));
  });

const recordClient = {
  getRecords,
};

export default recordClient;
