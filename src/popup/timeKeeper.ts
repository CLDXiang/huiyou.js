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
}

export function startTimekeeping(time?: number) {
  shutTimeKeeping();
  timeKeeper = new TimeKeeper(time ?? DURATION, resetTimeKeeper);
}
