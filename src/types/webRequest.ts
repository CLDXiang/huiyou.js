import { VideoInfo } from './video';

// “点赞” 请求的请求体
export interface LikeRequestBody {
  formData: {
    aid: [string]; // av 号
    csrf: [string];
    like: ['1' | '2']; // '1' 表示点赞，'2' 表示取消点赞
  };
}

// “收藏” 请求的请求体
export interface FavoriteRequestBody {
  formData: {
    add_media_ids: string[]; // 非空表示添加收藏
    csrf: string[];
    del_media_ids: string[]; // 非空表示取消收藏
    jsonp: string[];
    rid: [string]; // 视频的 av 号
    type: string[];
  };
}

export interface FetchVideoResponseBody {
  numPages: number; // 总页数，请求失败时为 0
  numResults: number; // 总结果数，请求失败时为 0
  page: number; // 请求的页数
  pagesize: number; // 每页视频数
  result: VideoInfo[] | null; // 视频信息
}
