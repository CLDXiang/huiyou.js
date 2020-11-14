import { getVideoInfo } from '@/apis/bilibili';

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
