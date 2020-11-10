import { BACKEND, BILI_API } from '@/config';
import axios, { AxiosResponse } from 'axios';

/** 后端 */
export const backendAxios = axios.create({
  baseURL: BACKEND.BASE_URL,
});

/** B 站 API 接口 */
export const biliAxios = axios.create({
  baseURL: BILI_API.BASE_URL,
});

export type AxiosResponsePromise<T> = Promise<AxiosResponse<T>>;
