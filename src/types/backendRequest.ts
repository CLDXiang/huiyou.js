/** 向后端报告视频推送信息的请求体 */
export interface CreateRecordRequestBody {
  /** 用户 id */
  uid: string;
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
  /** 缩略图 url */
  pic: string;
  /** 作者用户名 */
  author: string;
  /** 视频标题 */
  title: string;
}

/** 从后端获取视频推送记录的请求参数 */
export type SearchRecordsRequestParams = Partial<{
  /** 用户 id */
  uid: string;
  /** 视频 BV 号 */
  bvid: string;
}>;

/** 从后端获取视频推送记录的响应体 */
export type SearchRecordsResponseBody = Array<{
  /** 用户 id */
  uid: string;
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
  /** 推送视频的时间 */
  time: number;
}>;

/** 交互类型定义 */
export type VideoEvent = 'longEnough' | 'like' | 'coin' | 'favorite' | 'share';

/** 向后端报告用户与视频的交互行为的请求体 */
export interface ReportEventsBody {
  /** 交互类型 */
  event: VideoEvent;
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
  /** 视频播放量 */
  play: string;
}
