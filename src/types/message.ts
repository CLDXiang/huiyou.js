/** Content 与 Background 通信的接口类型 */

/** 页面脚本向背景脚本通信的类型 */
export type MessageType =
  /** 停止播放视频 */
  | 'pauseVideo'
  /** 给出推送视频 */
  | 'fetchVideo'
  /** 强制推送视频 */
  | 'fetchVideoForcedly'
  /** 同步推送信息的倒计时 */
  | 'synchronize'
  /** 关闭推送框 */
  | 'close';

/** 视频停止播放时的消息 */
export interface PauseVideoMessagePayload {
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
  /** 此视频播放的总时长/秒 */
  playedTime: number;
  /** 视频总时长/秒 */
  totalDuration: number;
}

/** 页面脚本向背景脚本通信的类型与内容的映射 */
export interface MessagePayloadMap {
  pauseVideo: PauseVideoMessagePayload;
  fetchVideo: undefined;
  fetchVideoForcedly: undefined;
  synchronize: undefined;
  close: undefined;
}

/** 页面脚本向背景脚本通信的信息 */
export interface Message<K extends MessageType> {
  type: K;
  payload: MessagePayloadMap[K];
}

export interface FetchVideoMessageResponse {
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
}

export interface SynchronizeResponse extends FetchVideoMessageResponse {
  remainingTime: number;
}

/** 背景脚本给页面脚本的响应的映射 */
export interface MessageResponseMap {
  pauseVideo: null;
  fetchVideo: FetchVideoMessageResponse | null;
  fetchVideoForcedly: FetchVideoMessageResponse | null;
  synchronize: SynchronizeResponse | null;
  close: undefined;
}
