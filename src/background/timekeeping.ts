import { TIMEKEEPING } from '@/config';

const { DURATION } = TIMEKEEPING;

let expiration: number | null = null;

export function startTimekeeping() {
  expiration = +new Date() + DURATION;
  setTimeout(() => {
    expiration = null;
  }, DURATION);
}

export function getRemainingTime(): number | null {
  if (expiration !== null) {
    return expiration - +new Date();
  }
  return null;
}
