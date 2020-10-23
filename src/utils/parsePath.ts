/**
 * 解析 B 站视频高能进度条的 path 元素的 d 属性，获得视频播放时间
 * @param d 要解析的 d 属性字符串
 * @returns 已播放部分占视频总长度的比例，或者 `null`
 */
export default function parsePath(d: string): number | null {
  const pattern = /M (.+) 100 H (.+) V 0 H \1 Z/g;
  let match = pattern.exec(d);
  let count = 0;
  let matched = false;
  while (match !== null) {
    matched = true;
    count += Number.parseFloat(match[2]) - Number.parseFloat(match[1]);
    match = pattern.exec(d);
  }
  return matched ? count / 1000 : null;
}
