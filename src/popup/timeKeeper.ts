import { TIMEKEEPING } from '@/config';
import TimeKeeper from '@/utils/timeKeeper';

const { DURATION } = TIMEKEEPING;

let timeKeeper: TimeKeeper | null = null;

function resetTimeKeeper() {
  timeKeeper = null;
}

export function shutTimeKeeping() {
  if (timeKeeper !== null) {
    timeKeeper.stop();
  }
  // offVideo();
}

export function startTimekeeping(time?: number) {
  timeKeeper = new TimeKeeper(time ?? DURATION, resetTimeKeeper);
}

export function modifyRemainingTime(time: number) {
  // onVideo();
  startTimekeeping(time); // 重新记时
}
