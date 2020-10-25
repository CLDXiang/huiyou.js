import { VideoInfo } from '@/types/video';
import axios from 'axios';

const backend = axios.create({
  baseURL: 'https://huiyou.fun/api/',
});

export function postRecord(uid: string, video: VideoInfo) {
  backend.post('records/', { uid, ...video });
}
