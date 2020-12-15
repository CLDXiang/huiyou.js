import { TIMEKEEPING } from '@/config';
import { offVideo, onVideo } from '@/popup/showVideo';

const { DURATION } = TIMEKEEPING;
let timerId = 0;

export function shutTimeKeeping() {
  if (timerId > 0) {
    clearTimeout(timerId);
  }
  offVideo();
}

export function startTimekeeping() {
  timerId = setTimeout(() => {
    shutTimeKeeping();
  }, DURATION);
}

function start2Timekeeping(time: number) {
  timerId = setTimeout(() => {
    shutTimeKeeping();
  }, time);
}

export function modifyRemainingTime(time: number) {
  if (time !== null) {
    onVideo();
    start2Timekeeping(time); // 重新记时
  } else {
    offVideo();
  }
}
