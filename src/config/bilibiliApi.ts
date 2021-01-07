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

/** cookie 相关配置 */
export const BILIBILI_COOKIES = freeze({
  URL: 'https://www.bilibili.com',
  UID_NAME: 'DedeUserID',
});
