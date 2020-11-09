import { RECORD_VIDEO } from '@/config';
import { FetchVideoMessageResponse, PauseVideoMessagePayload } from '@/types/message';
import getVideo from './fetchVideo';

const {
  DURATION_UPPER_LIMIT,
  PLAYED_TIME_PROPORTION_LOWER_LIMIT,
  VIDEO_COUNT_LOWER_LIMIT,
} = RECORD_VIDEO;

const videoRecord = new Set<string>();

function shouldRecordVideo({ playedTime, totalDuration }: PauseVideoMessagePayload): boolean {
  return (
    totalDuration <= DURATION_UPPER_LIMIT
    && playedTime >= totalDuration * PLAYED_TIME_PROPORTION_LOWER_LIMIT
  );
}

function shouldRecommendVideo(): boolean {
  return videoRecord.size >= VIDEO_COUNT_LOWER_LIMIT;
}

let recommendedVideo: FetchVideoMessageResponse | null = null;

export function recordVideoLocally(videoInfo: PauseVideoMessagePayload) {
  if (shouldRecordVideo(videoInfo)) {
    videoRecord.add(videoInfo.bvid);
    // 预拉取视频
    if (recommendedVideo === null && videoRecord.size >= VIDEO_COUNT_LOWER_LIMIT - 1) {
      getVideo().then((video) => {
        recommendedVideo = video;
      });
    }
  }
}

export function getRecommendedVideo(): FetchVideoMessageResponse | null {
  if (!shouldRecommendVideo()) {
    return null;
  }
  const video = recommendedVideo;
  recommendedVideo = null;
  videoRecord.clear();
  return video;
}
