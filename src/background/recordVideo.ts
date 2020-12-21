import { userOptions } from '@/config';
import { FetchVideoMessageResponse, PauseVideoMessagePayload } from '@/types/message';
import TimeKeeper from '@/utils/timeKeeper';
import VideoCandidate from './videoCandidate';

export interface LastVideoAndRemainingTime {
  video: FetchVideoMessageResponse;
  remainingTime: number;
}

export default class VideoRecorder {
  /** 记录已播放的视频 */
  private videoRecorded = new Set<string>();

  /** 存储接下来要推送的视频 */
  private videoCandidates = new VideoCandidate();

  /** 存储上一次推送的视频 */
  private lastVideoRecommended: FetchVideoMessageResponse | null = null;

  /** 计时器 */
  private timeKeeper: TimeKeeper | null = null;

  /** 向记录里添加视频 */
  addVideo(video: PauseVideoMessagePayload) {
    if (VideoRecorder.shouldRecordVideo(video)) {
      this.videoRecorded.add(video.bvid);
    }
  }

  /** 获取推送的视频 */
  async getRecommendedVideo(forcedly = false): Promise<FetchVideoMessageResponse | null> {
    if (!forcedly && !this.shouldRecommendVideo()) {
      return null;
    }

    const video = await this.videoCandidates.getNextVideo();
    if (video === null) {
      return null;
    }

    this.lastVideoRecommended = video;
    this.videoRecorded.clear();
    this.startTimeKeeping();
    return this.lastVideoRecommended;
  }

  /** 获取上一次推送的视频以及计时器的剩余时间 */
  getLastVideoAndRemainingTime(): LastVideoAndRemainingTime | null {
    const { lastVideoRecommended, timeKeeper } = this;
    if (lastVideoRecommended === null || timeKeeper === null) {
      return null;
    }

    const remainingTime = timeKeeper.remaining;
    if (remainingTime === null) {
      return null;
    }

    return {
      video: lastVideoRecommended,
      remainingTime,
    };
  }

  /** 强行结束计时 */
  stopTimekeeping() {
    if (this.timeKeeper !== null) {
      this.timeKeeper.stop();
      this.clearTimeKeeperAndVideo();
    }
  }

  /** 开始计时 */
  private startTimeKeeping() {
    this.timeKeeper = new TimeKeeper(
      userOptions.POPUP_DURATION * 1000, this.clearTimeKeeperAndVideo,
    );
  }

  /** 清空计时器和上次推送的视频 */
  private clearTimeKeeperAndVideo = () => {
    this.timeKeeper = null;
    this.lastVideoRecommended = null;
  };

  /** 判断是否应该记录此视频 */
  private static shouldRecordVideo(video: PauseVideoMessagePayload): boolean {
    const { playedTime, totalDuration } = video;
    return (
      totalDuration <= userOptions.DURATION_UPPER_LIMIT
      && playedTime >= totalDuration * (userOptions.PLAYED_TIME_PROPORTION_LOWER_LIMIT / 100)
    );
  }

  /** 判断当前是否满足推送视频的条件 */
  private shouldRecommendVideo(): boolean {
    return this.videoRecorded.size >= userOptions.VIDEO_COUNT_LOWER_LIMIT;
  }
}
