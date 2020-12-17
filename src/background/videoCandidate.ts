import { FETCH_VIDEO, RECORD_VIDEO } from '@/config';
import { FetchVideoMessageResponse } from '@/types/message';
import getVideo from './fetchVideo';

type VideoType = FetchVideoMessageResponse;

const { VIDEO_CACHE_COUNT } = RECORD_VIDEO;
const { FETCH_VIDEO_TIMEOUT } = FETCH_VIDEO;

export default class VideoCandidate {
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

  private timerId: number | undefined = undefined;

  private candidates = new Array<VideoType>();

  private fetchVideo = async () => {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.fetchVideo, FETCH_VIDEO_TIMEOUT);

    if (this.candidates.length >= VIDEO_CACHE_COUNT) {
      return;
    }

    const video = await getVideo();
    if (video !== null) {
      this.candidates.push(video);
    }
  }
}
