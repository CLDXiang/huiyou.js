import { BILIBILI_DATA_API } from '@/config';
import axios, { AxiosResponse } from 'axios';

/** B 站 API 接口 */
export const biliAxios = axios.create({
  baseURL: BILIBILI_DATA_API.BASE_URL,
});

export type AxiosResponsePromise<T> = Promise<AxiosResponse<T>>;
