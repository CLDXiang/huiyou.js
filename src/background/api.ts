import { biliRequest, recordRequest } from '@/apis';
import { PlayVideoInfo } from '@/types/video';
import { getUid } from '@/utils/cookies';
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

/** 获取视频完整信息 */
async function getVideoInfo(bvid: string): Promise<PlayVideoInfo | null> {
  try {
    const response = await biliRequest.getVideoInfo({ bvid });
    return response.data.data;
  } catch (error) {
    return null;
  }
}

/** 向后端报告推送的视频 */
export async function postRecord(bvid: string) {
  const uid = await getUid();
  if (uid === null) {
    return;
  }

  const video = await getVideoInfo(bvid);
  if (video === null) {
    return;
  }

  try {
    await recordRequest.postRecord({
      uid,
      bvid,
      pic: video.pic,
      author: video.owner.name,
      title: video.title,
    });
  } catch (error) {
    logger.error(`Error: Can't post records to backend - ${error}`);
  }
}
