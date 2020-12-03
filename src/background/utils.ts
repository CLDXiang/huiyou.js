import { getUid } from '@/utils/cookies';
import { postRecord as _postRecord } from './api';

export async function postRecord(bvid: string) {
  const uid = await getUid();
  if (uid !== null) {
    _postRecord(uid, bvid);
  }
}
