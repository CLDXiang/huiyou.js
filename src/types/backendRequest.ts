/** 向后端报告视频推送信息的请求体 */
export interface CreateRecordRequestBody {
  /** 用户 id */
  uid: string;
  /** 视频 BV 号 */
  bvid: string;
}

/** 从后端获取视频推送记录的请求参数 */
export type SearchRecordsRequestParam = Partial<{
  /** 用户 id */
  uid: string;
  /** 视频 BV 号 */
  bvid: string;
}>;

/** 从后端获取视频推送记录的响应体 */
export type SearchRecordsResponseBody = Array<{
  /** 用户 id */
  uid: string;
  /** 视频 BV 号 */
  bvid: string;
  /** 推送视频的时间 */
  time: number;
}>;

export interface NextRecommendedVideoRequestParam {
  /** 用户 id */
  uid: string;
}

/** 从后端获取推荐视频的响应体 */
export type NextRecommendedVideoResponseBody = null | {
  /** 视频 BV 号 */
  bvid: string;
};

/** 向后端报告用户与视频的交互行为的请求体 */
export interface ReportEventsBody {
  /** 交互类型 */
  event: 'longEnough' | 'like' | 'coin' | 'favorite' | 'share';
  /** 视频 BV 号 */
  bvid: string;
  /** 视频播放量 */
  play: string;
}
