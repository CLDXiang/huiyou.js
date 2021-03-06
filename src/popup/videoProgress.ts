import logger from '@/utils/logger';
import { extractParamFromUrl } from '@/utils/url';

/** 视频进度监测器 */
export class VideoProgress {
  constructor() {
    this.init();
  }

  /** 视频 DOM 元素 */
  element: HTMLVideoElement | null = null;

  /** 播放位图（秒） */
  private bitmap = new Uint8Array();

  /** 视频当前分 p 号 */
  private p = '1';

  private init() {
    this.element = document.querySelector('.bilibili-player-video > video');
    if (!this.element) {
      logger.log('未获取到 video 元素，5 秒后重试');
      /** 5 秒后重试 */
      setTimeout(this.init, 5000);
      return;
    }
    this.p = extractParamFromUrl(document.URL, 'p') || '1';
    this.bitmap = new Uint8Array(Math.floor(this.element.duration));
    this.element.addEventListener('timeupdate', () => this.handleTimeupdate());
    logger.log(`视频进度监测器初始化完成，视频总时长：${this.bitmap.length}s`);
  }

  /** timeupdate 事件处理函数 */
  private handleTimeupdate() {
    if (!this.element) {
      return;
    }
    // 换 p
    const newP = extractParamFromUrl(document.URL, 'p') || '1';
    if (newP !== this.p) {
      logger.log(`监测到换 p: ${this.p} -> ${newP}`);
      this.p = newP;
      // 此时 duration 为 NaN，下一时刻利用下方动态变化进行合成
      this.bitmap = new Uint8Array();
    }
    if (Math.floor(this.element.duration) > this.bitmap.length) {
      // 视频时长有时会动态变化，需要更新
      logger.log(`视频总时长更新：${this.bitmap.length}s -> ${Math.floor(this.element.duration)}s`);
      this.bitmap = new Uint8Array([
        ...this.bitmap,
        ...new Array(Math.floor(this.element.duration)).fill(0),
      ]);
    }
    this.bitmap[Math.floor(this.element.currentTime)] = 1;
  }

  /** 播放长度 */
  get playedTime() {
    if (!this.bitmap.length) {
      return 0;
    }
    const playedTime = this.bitmap.reduce((pv, cv) => pv + cv, 0);
    logger.log(`获取播放长度：${playedTime}s`);
    return playedTime;
  }

  /** 视频总时长 */
  get duration() {
    const duration = this.bitmap.length;
    logger.log(`获取视频总时长：${duration}s`);
    return duration;
  }
}
