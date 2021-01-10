import { biliRequest } from '@/apis';
import { getUid } from '@/utils/cookies';
// import { PlayVideoInfo } from '@/types/video';
import { addPushRecords } from '@/utils/pushRecords';

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

// /** 获取视频完整信息 */
// async function getVideoInfo(bvid: string): Promise<PlayVideoInfo | null> {
//   try {
//     const response = await biliRequest.getVideoInfo({ bvid });
//     return response.data.data;
//   } catch (error) {
//     return null;
//   }
// }

/** 记录推送的视频 */
export async function postPushRecord(bvid: string) {
  const uid = await getUid();
  if (uid === null) {
    return;
  }
  await addPushRecords(uid, bvid);
}
