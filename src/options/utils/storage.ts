import logger from '@/utils/logger';

/** 从本地存储中获取配置项 */
export const loadStorage: (keys: string[]) => Promise<{
  [key: string]: unknown;
}> = (keys) => new Promise((resolve) => {
  chrome.storage.local.get(keys, (items) => {
    logger.log('load options from storage: ', items);
    resolve(items);
  });
});

/** 存储配置项 */
export function setStorage(newConfig: Record<string, unknown>) {
  logger.log('set config: ', newConfig);
  chrome.storage.local.set(newConfig);
}
