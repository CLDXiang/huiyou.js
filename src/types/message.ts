/** Content 与 Background 通信的接口类型 */

/** 前端脚本向后端脚本通信的类型 */
export type MessageType =
  /** 播放视频 */
  | 'playVideo'
  /** 停止播放视频 */
  | 'pauseVideo'
  /** 给出推荐视频 */
  | 'fetchVideo'
  /** 同步推荐信息的倒计时 */
  | 'synchronizeTime';

/** 视频开始播放时的消息 */
export interface PlayVideoMessagePayload {
  /** 用户 id */
  uid: string;
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
}

/** 视频停止播放时的消息 */
export interface PauseVideoMessagePayload {
  /** 用户 id */
  uid: string;
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
  /** 此视频播放的总时长/秒 */
  playedTime: number;
  /** 视频总时长/秒 */
  totalDuration: number;
}

/** 要求推送视频时的消息 */
export interface FetchVideoMessagePayload {
  /** 用户 id */
  uid: string;
}

/** 前端脚本向后端脚本通信的类型与内容的映射 */
export interface MessagePayloadMap {
  playVideo: PlayVideoMessagePayload;
  pauseVideo: PauseVideoMessagePayload;
  fetchVideo: FetchVideoMessagePayload;
  synchronizeTime: undefined;
}

/** 前端脚本向后端脚本通信的信息 */
export interface Message<K extends MessageType> {
  type: K;
  payload: MessagePayloadMap[K];
}

export interface FetchVideoMessageResponse {
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
}

/** 后端脚本给前端脚本的响应的映射 */
export interface MessageResponseMap {
  playVideo: undefined;
  pauseVideo: undefined;
  fetchVideo: FetchVideoMessageResponse | null;
  synchronizeTime: number | null;
}
