/** 向后端报告视频推送信息的请求体 */
export interface CreateRecordRequestBody {
  uid: string;
  bvid: string;
}

/** 从后端获取视频推送记录的请求参数 */
export type SearchRecordsRequestParam = Partial<{
  uid: string;
  bvid: string;
}>;

/** 从后端获取视频推送记录的响应体 */
export type SearchRecordsResponseBody = Array<{
  uid: string;
  bvid: string;
  time: number;
}>;

export interface NextRecommendedVideoRequestParam {
  uid: string;
}

/** 从后端获取推荐视频的响应体 */
export type NextRecommendedVideoResponseBody = null | {
  bvid: string;
};

/** 向后端报告用户与视频的交互行为的请求体 */
export interface ReportEventsBody {
  event: 'longEnough' | 'like' | 'coin' | 'favorite' | 'share';
  bvid: string;
  play: string;
}
