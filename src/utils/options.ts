import logger from './logger';

export type GeneralOption = Record<string, unknown>;

/** 存储配置项 */
export function setSyncStorage(newOptions: GeneralOption) {
  logger.log('set options: ', newOptions);
  chrome.storage.sync.set(newOptions);
}

export const RESET_OPTION = Symbol('Reset options');

/** 代理配置项，使用本地存储，值必须是**原始类型**，且**不能为 `undefined`** */
class OptionHandler<T extends GeneralOption> implements ProxyHandler<T> {
  /** 配置项的缓存 */
  private cache: T;

  constructor(options: T) {
    this.cache = { ...options };

    this.loadStorage();

    chrome.storage.onChanged.addListener((changes) => {
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
    setSyncStorage({ [p]: value });
    return true;
  }

  /** 从本地存储中获取配置项，**必须在给 `this.cache` 赋值后调用** */
  private loadStorage() {
    if (this.cache === undefined) {
      throw new Error('`this.cache` must be assigned before loading storage');
    }

    chrome.storage.sync.get(Object.keys(this.cache), (items) => {
      logger.log('load options from storage: ', items);
      Object.entries(items).forEach(([key, value]) => {
        this.cache[key as keyof T] = value;
      });
      logger.log('after loading options: ', this.cache);
    });
  }

  /** 重置所有配置项 */
  private reset(defaultOptions: T) {
    this.cache = { ...defaultOptions };
    setSyncStorage(defaultOptions);
  }
}

type UserOptions<T> = T & {
  [RESET_OPTION]: () => void;
}

/**
 * 1. 配置项的值必须是原始类型，且不能为 `undefined`
 * 2. 调用者需保证不同配置项的键名不会冲突，否则值会发生覆盖
 */
export function makeOption<T extends GeneralOption>(options: T): UserOptions<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Proxy(options, new OptionHandler(options)) as any;
}
