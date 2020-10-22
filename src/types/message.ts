/** Content 与 Background 通信的接口类型 */

import { VideoInfo } from './video';

export type MessageType = 'playVideo' | 'pauseVideo' | 'fetchVideo' | 'synchronizeTime';

/** 视频开始播放时的消息 */
interface PlayVideoMessagePayload {
  bvid: string;
}

/** 视频停止播放时的消息 */
export interface PauseVideoMessagePayload {
  uid: string;
  bvid: string;
  /** 此视频播放的总时长/秒 */
  playedTime: number;
  /** 视频总时长/秒 */
  totalDuration: number;
}

export interface MessagePayloadMap {
  playVideo: PlayVideoMessagePayload;
  pauseVideo: PauseVideoMessagePayload;
  fetchVideo: undefined;
  synchronizeTime: undefined;
}

/** 前端脚本向后端脚本通信的信息 */
export interface Message<K extends MessageType> {
  type: K;
  payload: MessagePayloadMap[K];
}

/** 后端脚本给前端脚本的响应 */
export interface MessageResponseMap {
  playVideo: undefined;
  pauseVideo: undefined;
  fetchVideo: VideoInfo | null;
  synchronizeTime: number | null;
}
