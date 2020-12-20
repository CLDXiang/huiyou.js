import { DEBUG_MODE } from '@/utils/config';
import { makeOption } from '@/utils/options';

const { freeze } = Object;

/** 视频记录模块常量 */
export const RECORD_VIDEO = freeze({
  /** 缓存的预拉取视频数 */
  VIDEO_CACHE_COUNT: 5,
});

/** 拉取视频模块常量 */
export const FETCH_VIDEO = freeze({
  /** 视频所在分区 */
  KEYWORD: 'VLOG',
  /** 拉取视频的起始页数 */
  START_PAGE: 400,
  /** 拉取视频的结束页数 */
  END_PAGE: 390,
  /** 拉取视频的时间间隔/毫秒 */
  FETCH_VIDEO_TIMEOUT: 60 * 1000,
});

export const DEFAULT_USER_OPTIONS = freeze({
  /** 弹框显示时长/ms */
  POPUP_DURATION: DEBUG_MODE ? 70000 : 7000,
  /** 推荐的视频的播放量上限 */
  AMOUNT_OF_PLAY_UPPER_LIMIT: 0,
  /** 推荐的视频的长度下限/秒 */
  VIDEO_DURATION_LOWER_LIMIT: 60,
  /** 至少记录几个视频后可以推送视频 */
  VIDEO_COUNT_LOWER_LIMIT: DEBUG_MODE ? 1 : 5,
  /** 记录的视频的播放比例下限 */
  PLAYED_TIME_PROPORTION_LOWER_LIMIT: DEBUG_MODE ? 0 : 1 / 3,
  /** 记录的视频的时长上限/秒 */
  DURATION_UPPER_LIMIT: 60 * 15,
});

/** 用户设置 */
export const userOptions = makeOption({ ...DEFAULT_USER_OPTIONS });
