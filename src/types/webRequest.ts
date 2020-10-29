import { OriginVideoInfo } from './video';

/** “点赞” 请求的请求体 */
export interface LikeRequestBody {
  formData: {
    /** AV 号 */
    aid: [string];
    csrf: [string];
    /** '1' 表示点赞，'2' 表示取消点赞 */
    like: ['1' | '2'];
  };
}

/** “收藏” 请求的请求体 */
export interface FavoriteRequestBody {
  formData: {
    /** 非空表示添加收藏 */
    add_media_ids: string[];
    csrf: string[];
    /** 非空表示取消收藏 */
    del_media_ids: string[];
    jsonp: string[];
    /** 视频的 AV 号 */
    rid: [string];
    type: string[];
  };
}

/** 视频接口的响应体 */
export interface FetchVideoResponseBody {
  /** 总页数，请求失败时为 0 */
  numPages: number;
  /** 总结果数，请求失败时为 0 */
  numResults: number;
  /** 请求的页数 */
  page: number;
  /** 每页视频数 */
  pagesize: number;
  /** 视频信息 */
  result: OriginVideoInfo[] | null;
}
