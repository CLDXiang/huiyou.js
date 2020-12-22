import { FETCH_VIDEO, RECORD_VIDEO } from '@/config';
import { FetchVideoMessageResponse } from '@/types/message';
import getVideo from './fetchVideo';

type VideoType = FetchVideoMessageResponse;

const { VIDEO_CACHE_COUNT } = RECORD_VIDEO;
const { FETCH_VIDEO_TIMEOUT } = FETCH_VIDEO;

export default class VideoCandidate {
  private timerId: number | undefined = undefined;

  /** 缓存视频信息 */
  private candidates = new Array<VideoType>();

  constructor() {
    this.fetchVideo();
  }

  async getNextVideo(): Promise<VideoType | null> {
    const { candidates } = this;
    if (candidates.length === 0) {
      await this.fetchVideo();
    }

    const video = candidates.shift();
    if (candidates.length === 0) {
      this.fetchVideo();
    }

    return video ?? null;
  }

  private get cachedVideos(): string[] {
    return this.candidates.map(({ bvid }) => bvid);
  }

  /** 预拉取视频 */
  private fetchVideo = async () => {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.fetchVideo, FETCH_VIDEO_TIMEOUT);

    // 缓存达到上限，不采取任何操作
    if (this.candidates.length >= VIDEO_CACHE_COUNT) {
      return;
    }

    const video = await getVideo(this.cachedVideos);
    if (video !== null) {
      this.candidates.push(video);
    }
  }
}
