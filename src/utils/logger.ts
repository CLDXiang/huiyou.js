/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEBUG_MODE } from './config';

const { NODE_ENV } = process.env;

const logger = {
  /** 调试用 log */
  log(...args: any[]) {
    if (DEBUG_MODE || NODE_ENV !== 'production') {
      console.log(...args);
    }
  },
  /** 生产环境控制台会显示的信息 */
  info(...args: any[]) {
    console.log(...args);
  },
  /** 生产环境控制台会显示的报错信息 */
  error(...args: any[]) {
    console.error(...args);
  },
};

export default logger;
