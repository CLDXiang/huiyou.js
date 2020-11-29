import { API_URL } from '@/utils/config';

const { freeze } = Object;

/** 后端相关配置 */
export const BACKEND = freeze({
  /** 后端接口基础 URL */
  BASE_URL: API_URL,
  RECORD_URL: 'records',
  VIDEO_URL: 'videos',
});
