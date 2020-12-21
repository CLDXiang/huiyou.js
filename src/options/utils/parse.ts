/** string 转 number，遇到 NaN 用缺省值 */
export function parseStringToNumber(mayBeAString: unknown, defaultValue: number) {
  if (typeof mayBeAString === 'string') {
    const tryIt = parseFloat(mayBeAString);
    if (Number.isNaN(tryIt)) {
      return defaultValue;
    }
    return tryIt;
  }
  if (typeof mayBeAString === 'number' && !Number.isNaN(mayBeAString)) {
    return mayBeAString;
  }
  return defaultValue;
}
