import dayjs from 'dayjs';
import logger from '@/utils/logger';

/** 基本推送记录项 */
interface PushRecord {
  /** 视频 BV 号，以 `BV` 开头 */
  bvid: string;
  /** 推送视频的时间，unix 时间戳（ms） */
  createdAt: number;
}

/** storage 中 pushRecords 项的结构 */
type PushRecords = Record<string, PushRecord[]>;

/** 获取推送记录 */
export function getPushRecords(): Promise<PushRecords> {
  return new Promise((resolve) => {
    chrome.storage.sync.get('pushRecords', ({ pushRecords: pushRecordsString = '{}' }) => {
      const pushRecords: PushRecords = JSON.parse(pushRecordsString);
      logger.log('get push records', pushRecords);
      resolve(pushRecords);
    });
  });
}

/** 对每个 uid 存储的推送记录上限 */
const MAX_PUSH_RECORDS_NUMBER_PER_USER = 10;

/** 根据 B 站 uid 添加推送记录 */
export async function addPushRecords(uid: string, bvid: string) {
  const pushRecords = await getPushRecords();
  const pushRecordsByUid = pushRecords[uid] || [];
  pushRecordsByUid.unshift({
    bvid,
    createdAt: +dayjs(),
  });
  pushRecords[uid] = pushRecordsByUid.slice(0, MAX_PUSH_RECORDS_NUMBER_PER_USER);
  logger.log('set push records', pushRecords);
  chrome.storage.sync.set({ pushRecords: JSON.stringify(pushRecords) });
}
