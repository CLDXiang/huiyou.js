import logger from '@/utils/logger';
import imgStatic from '@/assets/simple-tag.png';
import { addClass, addStyle } from './utils';

let hoverBox: HTMLDivElement | null = null;
let hoverImg: HTMLImageElement | null = null;

export function offHoverIcon() {
  if (hoverBox !== null) {
    addStyle(hoverBox, {
      visibility: 'hidden',
    });
  }
}

export function initialHoverIcon() {
  const { body } = document;
  logger.log('hover Icon');
  hoverBox = document.createElement('div');
  hoverImg = document.createElement('img');
  hoverImg.src = imgStatic;
  hoverBox.appendChild(hoverImg);
  addClass(hoverBox, 'huiyou-bubble');
  addClass(hoverImg, 'huiyou-bubble-img');
  addStyle(hoverBox, { visibility: 'visible' });
  body.appendChild(hoverBox);
  return hoverImg;
}
