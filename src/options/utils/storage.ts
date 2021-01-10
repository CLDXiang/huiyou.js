import logger from '@/utils/logger';

/** 从 storage.sync 中获取配置项 */
export const loadStorage: (keys: string[]) => Promise<{
  [key: string]: unknown;
}> = (keys) => new Promise((resolve) => {
  chrome.storage.sync.get(keys, (items) => {
    logger.log('load options from storage: ', items);
    resolve(items);
  });
});
