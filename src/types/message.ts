/** Content 与 Background 通信的接口类型 */

/** Content 要求 Background 获取视频 */
interface FetchVideo {
  type: 'fetchVideo';
}

export type Message = FetchVideo;
