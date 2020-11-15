import { getVideoInfo } from '@/apis/bilibili';
import { getNextRecommendedVideo } from '@/apis/videos';
import { FetchVideoMessageResponse } from '@/types/message';

interface BvidAndPlay {
  bvid: string;
  play: string;
}

export async function getBvidAndPlay(aid: string): Promise<BvidAndPlay | null> {
  try {
    const response = await getVideoInfo({ aid });
    if (response.status === 200) {
      const { data } = response.data;
      return {
        bvid: data.bvid,
        play: data.stat.view.toString(),
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getNextVideoFromBackend(
  uid: string,
): Promise<FetchVideoMessageResponse | null> {
  try {
    const response = await getNextRecommendedVideo({ uid });
    if (response.status === 200) {
      const bvid = response.data?.bvid;
      if (bvid !== undefined) {
        return { bvid };
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}
