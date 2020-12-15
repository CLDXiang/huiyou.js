import { TIMEKEEPING } from '@/config';
import TimeKeeper from '@/utils/timeKeeper';

const { DURATION } = TIMEKEEPING;

let timeKeeper: TimeKeeper | null = null;

function resetTimeKeeper() {
  timeKeeper = null;
}

export function startTimekeeping() {
  timeKeeper = new TimeKeeper(DURATION, resetTimeKeeper);
}

export function getRemainingTime(): number | null {
  return timeKeeper?.remaining ?? null;
}
