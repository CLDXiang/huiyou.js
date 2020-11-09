const { freeze } = Object;

/** B 站 API 接口的 URL */
export const bilibiliApiUrl = freeze({
  /** 点赞请求的 URL */
  like: 'https://api.bilibili.com/x/web-interface/archive/like',
  /** 收藏请求的 URL */
  favorite: 'https://api.bilibili.com/x/v3/fav/resource/deal',
});
