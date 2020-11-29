import { biliRequest, recordRequest, videoRequest } from '@/apis';
import { ReportEventsBody } from '@/types/backendRequest';
import { FetchVideoMessageResponse } from '@/types/message';
import logger from '@/utils/logger';

interface BvidAndPlay {
  bvid: string;
  play: string;
}

/** 根据 av 号获取 bv 号和播放量 */
export async function getBvidAndPlay(aid: string): Promise<BvidAndPlay | null> {
  try {
    const response = await biliRequest.getVideoInfo({ aid });
    if (response.status === 200) {
      const { data } = response.data;
      return {
        bvid: data.bvid,
        play: data.stat.view.toString(),
      };
    }
    return null;
  } catch (error) {
    // TODO: 错误日志
    return null;
  }
}

/** 从后端获取推荐的视频 */
export async function getNextVideoFromBackend(
  uid: string,
): Promise<FetchVideoMessageResponse | null> {
  try {
    const response = await videoRequest.getNextRecommendedVideo({ uid });
    if (response.status === 200) {
      const bvid = response.data?.bvid;
      if (bvid !== undefined) {
        return { bvid };
      }
    }

    return null;
  } catch (error) {
    logger.error(`Error: Can't get video from backend - ${error}`);
    return null;
  }
}

/** 向后端报告推送的视频 */
export async function postRecord(uid: string, bvid: string) {
  try {
    await recordRequest.postRecord({ uid, bvid });
  } catch (error) {
    logger.error(`Error: Can't post records to backend - ${error}`);
  }
}

export async function reportEvents(body: ReportEventsBody) {
  try {
    await videoRequest.reportEvents(body);
  } catch (error) {
    logger.error(`Error: Can't report events to backend - ${error}`);
  }
}
