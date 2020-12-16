class TimeKeeper {
  private timerId: number | undefined;

  private expiration: number | undefined;

  constructor(timeout: number, handler?: Function) {
    // eslint-disable-next-line no-param-reassign
    timeout = Math.max(0, timeout);
    this.expiration = +new Date() + timeout;
    this.timerId = setTimeout(() => {
      this.timerId = undefined;
      if (handler) {
        handler();
      }
    }, timeout);
  }

  /**
   * 停止计时，之后计时器失效，不能再次使用，重新计时需要另外新建一个对象
   */
  stop() {
    this.expiration = undefined;
    clearTimeout(this.timerId);
  }

  /**
   * 获取计时器的剩余时间
   */
  get remaining(): number | null {
    if (this.expiration !== undefined) {
      return this.expiration - +new Date();
    }
    return null;
  }
}

export default TimeKeeper;
