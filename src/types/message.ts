/** Content 与 Background 通信的接口类型 */

import { VideoInfo } from './video';

export type MessageType = 'playVideo' | 'pauseVideo';

interface PlayVideoMessagePayload {
  bvid: string;
  duration: number;
}

interface PauseVideoMessagePayload {
  bvid: string;
}

export interface MessagePayloadMap {
  playVideo: PlayVideoMessagePayload;
  pauseVideo: PauseVideoMessagePayload;
}

export interface Message<K extends MessageType> {
  type: K;
  payload: MessagePayloadMap[K];
}

type PauseVideoMessageResponse = VideoInfo | null;

export interface MessageResponseMap {
  playVideo: undefined;
  pauseVideo: PauseVideoMessageResponse;
}
