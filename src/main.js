import {remove, render} from './utils/render.js';
import FilmsAmountView from './view/films-amount.js';
import StatsView from './view/stats.js';
import FilmsPresenter from './presenter/films.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import Api from './api.js';
import {MenuItem, UpdateType} from './const.js';

const AUTHORIZATION = 'Basic querys703nb1211bg';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.main');
const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer');
const statsElement = footerElement.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter(mainElement, filmsModel, filterModel, api);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILMS:
      filmsPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      filmsPresenter.destroy();
      statisticsComponent = new StatsView(filmsModel.getFilms());
      render(mainElement, statisticsComponent);
      break;
  }
};

const filterPresenter = new FilterPresenter(headerElement, mainElement, filterModel, filmsModel, handleSiteMenuClick);

filterPresenter.init();
filmsPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(statsElement, new FilmsAmountView(films.length));
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
