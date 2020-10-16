import { addStyle, addClass } from './utils';
import './popup.less';

console.log('Link Start!');

// 注入页面元素
const { body } = document;

const popupBox = document.createElement('div');

// addStyle(popupBox, {
//   background: '#fff',
//   height: '100px',
//   width: '100px',
//   position: 'fixed',
//   right: '30px',
//   top: '80px',
// });

addClass(popupBox, 'huiyou-popup-box');

body.appendChild(popupBox);
