import {remove, render} from './utils/render.js';
import ProfileView from './view/profile.js';
import FilmsAmountView from './view/films-amount.js';
import StatsView from './view/stats.js';
import FilmsPresenter from './presenter/films.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import {generateFilmCard} from './mock/film-card.js';
import {MenuItem} from './const.js';

const FILMS_CARD_TOTAL = 15;

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.main');
const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer');
const statsElement = footerElement.querySelector('.footer__statistics');

const films = new Array(FILMS_CARD_TOTAL).fill(null).map((_, index) => generateFilmCard(index));

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter(mainElement, filmsModel, filterModel);

render(headerElement, new ProfileView());

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

const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel, handleSiteMenuClick);

filterPresenter.init();
filmsPresenter.init();

render(statsElement, new FilmsAmountView(FILMS_CARD_TOTAL));
