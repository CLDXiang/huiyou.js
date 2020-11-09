import { BACKEND } from '@/config';
import axios, { AxiosResponse } from 'axios';

const { BASE_URL } = BACKEND;

const backend = axios.create({
  baseURL: BASE_URL,
});

export default backend;

export type AxiosResponsePromise<T> = Promise<AxiosResponse<T>>;
