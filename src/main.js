import {render} from './utils.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createFilmsTemplate} from './view/films.js';
import {createProfileTemplate} from './view/profile.js';
import {createPopupTemplate} from './view/popup.js';
import {createFilmsEmountTemplate} from './view/statistics.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatsElement = siteFooterElement.querySelector('.footer__statistics');

render(siteMainElement, createMenuTemplate(), 'beforeend');

render(siteMainElement, createFilterTemplate(), 'beforeend');

render(siteMainElement, createFilmsTemplate(), 'beforeend');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');

render(siteFooterElement, createPopupTemplate(), 'afterend');

render(siteFooterStatsElement, createFilmsEmountTemplate(), 'afterend');
