/** string 转 number，遇到 NaN 用缺省值 */
export function parseStringToNumber(mayBeAString: unknown, or: number) {
  if (typeof mayBeAString === 'string') {
    const tryIt = parseFloat(mayBeAString);
    if (Number.isNaN(tryIt)) {
      return or;
    }
    return tryIt;
  }
  if (typeof mayBeAString === 'number' && !Number.isNaN(mayBeAString)) {
    return mayBeAString;
  }
  return or;
}
