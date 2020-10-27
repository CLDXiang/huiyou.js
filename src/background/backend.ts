import { VideoInfo } from '@/types/video';
import axios from 'axios';
import { BACKEND } from './config';

const { BASE_URL, POST_RECORD_URL } = BACKEND;

const backend = axios.create({
  baseURL: BASE_URL,
});

export function postRecord(uid: string, video: VideoInfo) {
  backend.post(POST_RECORD_URL, { uid, ...video });
}
