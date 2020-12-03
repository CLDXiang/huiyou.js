const { freeze } = Object;

/** B 站数据 API 接口 */
export const BILIBILI_DATA_API = {
  /** B 站 API 基础接口 */
  BASE_URL: 'https://api.bilibili.com/',
  /** 获取视频基本信息 */
  VIDEO_INFO_URL: 'x/web-interface/view',
  /** 获取视频预览信息 */
  VIDEO_SHOT_URL: 'x/player/videoshot',
};

/** 监听用户行为的 B 站 URL */
export const BILIBILI_LISTENED_URL = freeze({
  /** 点赞请求的 URL */
  like: 'https://api.bilibili.com/x/web-interface/archive/like',
  /** 收藏请求的 URL */
  favorite: 'https://api.bilibili.com/x/v3/fav/resource/deal',
});

/** cookie 相关配置 */
export const BILIBILI_COOKIES = freeze({
  URL: 'https://www.bilibili.com',
  UID_NAME: 'DedeUserID',
});
