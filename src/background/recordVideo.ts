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
let lastRecommendedVideo: FetchVideoMessageResponse | null = null;

export async function recordVideoLocally(videoInfo: PauseVideoMessagePayload) {
  if (shouldRecordVideo(videoInfo)) {
    videoRecord.add(videoInfo.bvid);
    // 预拉取视频
    if (recommendedVideo === null && videoRecord.size >= VIDEO_COUNT_LOWER_LIMIT - 1) {
      recommendedVideo = await getVideo();
    }
  }
}

export function getRecommendedVideo(): FetchVideoMessageResponse | null {
  if (!shouldRecommendVideo()) {
    return null;
  }
  lastRecommendedVideo = recommendedVideo;
  recommendedVideo = null;
  videoRecord.clear();
  return lastRecommendedVideo;
}

export async function getRecommendedVideoForcedly(): Promise<FetchVideoMessageResponse | null> {
  if (recommendedVideo !== null) {
    lastRecommendedVideo = recommendedVideo;
  } else {
    lastRecommendedVideo = await getVideo();
  }

  recommendedVideo = null;
  videoRecord.clear();
  return lastRecommendedVideo;
}

export function getLastRecommendedVideo(): FetchVideoMessageResponse | null {
  return lastRecommendedVideo;
}
