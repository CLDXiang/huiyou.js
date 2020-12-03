/** 读取 cookies 获取信息 */
import { BILIBILI_COOKIES } from '@/config';

/** 获取 uid */
export function getUid(): Promise<string | null> {
  return new Promise((resolve) =>
    chrome.cookies.get({ url: BILIBILI_COOKIES.URL, name: BILIBILI_COOKIES.UID_NAME }, (cookie) => {
      resolve(cookie?.value ?? null);
    }));
}
