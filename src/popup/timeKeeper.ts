import { TIMEKEEPING } from '@/config';
import { offVideo, onVideo } from '@/popup/showVideo';
import TimeKeeper from '@/utils/timeKeeper';

const { DURATION } = TIMEKEEPING;
const timerId = 0;

let timeKeeper: TimeKeeper | null = null;

function resetTimeKeeper() {
  timeKeeper = null;
}

export function shutTimeKeeping() {
  if (timeKeeper !== null) {
    timeKeeper.stop();
  }
  offVideo();
}

export function startTimekeeping() {
  timeKeeper = new TimeKeeper(DURATION, resetTimeKeeper);
}

function start2Timekeeping(time: number) {
  timeKeeper = new TimeKeeper(time, resetTimeKeeper);
}

export function modifyRemainingTime(time: number) {
  if (time !== null) {
    onVideo();
    start2Timekeeping(time); // 重新记时
  } else {
    offVideo();
  }
}
