/* eslint-disable no-param-reassign */
import logger from '@/utils/logger';
import { TIMEKEEPING } from './config';

const { DURATION } = TIMEKEEPING;
let expiration: number | null = null;

function offVideo(popupBox: HTMLDivElement) {
  if (popupBox !== null) {
    popupBox.style.visibility = 'hidden';
  }
}

function onVideo(popupBox: HTMLDivElement) {
  if (popupBox !== null) {
    popupBox.style.visibility = 'visible';
  }
}

export function shutTimeKeeping(popupBox: HTMLDivElement) {
  expiration = null;
  offVideo(popupBox);
}

export function startTimekeeping(popupBox: HTMLDivElement) {
  expiration = +new Date() + DURATION;
  setTimeout(() => {
    // TODO
    shutTimeKeeping(popupBox);
  }, DURATION);
}

function start2Timekeeping(popupBox: HTMLDivElement, time: number) {
  expiration = +new Date() + DURATION;
  setTimeout(() => {
    shutTimeKeeping(popupBox);
  }, time);
}
export function modifyRemainingTime(time: number, popupBox: HTMLDivElement) {
  logger.info(`before${expiration}`);
  if (time !== null) {
    expiration = time;
    onVideo(popupBox);
    start2Timekeeping(popupBox, time); // 重新记时
  } else {
    offVideo(popupBox);
  }
}
