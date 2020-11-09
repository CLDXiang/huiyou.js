/** 后端存储的视频数据类型 */
export interface VideoInfo {
  arcrank: string;
  arcurl: string;
  author: string;
  badgepay: boolean;
  /** BV 号 */
  bvid: string;
  description: string;
  /** 时长/秒 */
  duration: number;
  /** 收藏数 */
  favorites: number;
  is_pay: number;
  is_union_video: number;
  mid: number;
  /** 预览图 */
  pic: string;
  /** 播放量 */
  play: string;
  pubdate: string;
  rank_offset: number;
  rank_index: number;
  rank_score: number;
  review: number;
  senddate: number;
  tag: string;
  title: string;
  type: string;
  video_review: number;
}

/** B 站视频请求返回类型 */
export type OriginVideoInfo = VideoInfo & { id?: number };
