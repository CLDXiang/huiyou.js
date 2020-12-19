import logger from './logger';

type GeneralConfig = Record<string, unknown>;

/** 代理配置项，使用本地存储，值必须是**原始类型**，且**不能为 `undefined`** */
class OptionHandler<T extends GeneralConfig> implements ProxyHandler<T> {
  /** 配置项的缓存 */
  private cache: T;

  constructor(config: T) {
    this.cache = { ...config };

    this.loadStorage();

    chrome.storage.onChanged.addListener((changes, areaName) => {
      // 只处理本地存储
      if (areaName !== 'local') return;

      Object.entries(changes).forEach(([key, { newValue }]) => {
        // 没有新的值
        if (newValue === undefined) return;
        // 配置项中不存在此属性
        if (!Object.prototype.hasOwnProperty.call(this.cache, key)) return;
        logger.log(`set ${key} to ${newValue}`);
        this.cache[key as keyof T] = newValue;
      });
    });
  }

  get(_: T, p: keyof T) {
    return this.cache[p];
  }

  set(_: T, p: keyof T, value: T[typeof p]) {
    this.cache[p] = value;
    OptionHandler.setLocalStorage({ [p]: value });
    return true;
  }

  /** 从本地存储中获取配置项，**必须在给 `this.cache` 赋值后调用** */
  private loadStorage() {
    chrome.storage.local.get(Object.keys(this.cache), (items) => {
      logger.log('load options from storage: ', items);
      Object.entries(items).forEach(([key, value]) => {
        this.cache[key as keyof T] = value;
      });
      logger.log('after loading config: ', this.cache);
    });
  }

  /** 存储配置项，键值不带前缀 */
  private static setLocalStorage(newConfig: GeneralConfig) {
    const config: GeneralConfig = {};
    Object.entries(newConfig).forEach(([key, value]) => {
      config[key] = value;
    });
    logger.log('set config: ', config);
    chrome.storage.local.set(config);
  }
}

/**
 * 1. 配置项的值必须是原始类型，且不能为 `undefined`
 * 1. 调用者需保证不同配置项的键名不会冲突，否则值会发生覆盖
 */
export function makeOption<T extends GeneralConfig>(config: T) {
  return new Proxy(config, new OptionHandler(config));
}
