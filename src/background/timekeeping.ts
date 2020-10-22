/** 计时时长/ms */
const duration = 7000;
let expiration: number | null = null;

export function startTimekeeping() {
  expiration = +new Date() + duration;
  setTimeout(() => {
    expiration = null;
  }, duration);
}

export function getRemainingTime(): number | null {
  if (expiration !== null) {
    return expiration - +new Date();
  }
  return null;
}
