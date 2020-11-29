import logger from '@/utils/logger';
import { VideoInfo } from '@/types/video';
import axios from 'axios';
import { BACKEND } from '@/config';

const { BASE_URL, RECORD_URL } = BACKEND;

const backend = axios.create({
  baseURL: BASE_URL,
});

export function postRecord(uid: string, video: VideoInfo) {
  logger.info('post backend video');
  logger.info(video);
  backend.post(RECORD_URL, { uid, ...video });
}