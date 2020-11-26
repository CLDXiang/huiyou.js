/* eslint-disable no-param-reassign */
import { CSSProperties } from 'vue';
import { addStyle } from './utils';
import { TIMEKEEPING } from './config';

const { DURATION } = TIMEKEEPING;
let timerId = 0;

function offVideo(popupBox: HTMLDivElement) {
  if (popupBox !== null) {
    addStyle(popupBox, 'visibility: hidden' as CSSProperties);
  }
}

function onVideo(popupBox: HTMLDivElement) {
  if (popupBox !== null) {
    addStyle(popupBox, 'visibility: visible' as CSSProperties);
  }
}

export function shutTimeKeeping(popupBox: HTMLDivElement) {
  if (timerId > 0) {
    clearTimeout(timerId);
  }
  offVideo(popupBox);
}

export function startTimekeeping(popupBox: HTMLDivElement) {
  timerId = setTimeout(() => {
    // TODO
    shutTimeKeeping(popupBox);
  }, DURATION);
}

function start2Timekeeping(popupBox: HTMLDivElement, time: number) {
  timerId = setTimeout(() => {
    shutTimeKeeping(popupBox);
  }, time);
}
export function modifyRemainingTime(time: number, popupBox: HTMLDivElement) {
  if (time !== null) {
    onVideo(popupBox);
    start2Timekeeping(popupBox, time); // 重新记时
  } else {
    offVideo(popupBox);
  }
}
