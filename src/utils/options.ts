import logger from './logger';

type GeneralConfig = Record<string, unknown>;

export const RESET_OPTION = Symbol('Reset options');

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

  get(target: T, p: keyof T | typeof RESET_OPTION) {
    if (p === RESET_OPTION) {
      return () => this.reset(target);
    }
    return this.cache[p];
  }

  set(_: T, p: keyof T, value: T[typeof p]) {
    this.cache[p] = value;
    OptionHandler.setLocalStorage({ [p]: value });
    return true;
  }

  /** 从本地存储中获取配置项，**必须在给 `this.cache` 赋值后调用** */
  private loadStorage() {
    if (this.cache === undefined) {
      throw new Error('`this.cache` must be assigned before loading storage');
    }

    chrome.storage.local.get(Object.keys(this.cache), (items) => {
      logger.log('load options from storage: ', items);
      Object.entries(items).forEach(([key, value]) => {
        this.cache[key as keyof T] = value;
      });
      logger.log('after loading config: ', this.cache);
    });
  }

  /** 存储配置项 */
  private static setLocalStorage(newConfig: GeneralConfig) {
    logger.log('set config: ', newConfig);
    chrome.storage.local.set(newConfig);
  }

  /** 重置所有配置项 */
  private reset(defaultConfig: T) {
    this.cache = { ...defaultConfig };
    OptionHandler.setLocalStorage(defaultConfig);
  }
}

type UserOptions<T> = T & {
  [RESET_OPTION]: () => void;
}

/**
 * 1. 配置项的值必须是原始类型，且不能为 `undefined`
 * 2. 调用者需保证不同配置项的键名不会冲突，否则值会发生覆盖
 */
export function makeOption<T extends GeneralConfig>(config: T): UserOptions<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Proxy(config, new OptionHandler(config)) as any;
}
