import {render, PlaceTypes} from './dom-utils.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createFilmsTemplate} from './view/films.js';
import {createProfileTemplate} from './view/profile.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createPopupTemplate} from './view/popup.js';
import {createFilmsAmountTemplate} from './view/films-amount.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createFilmExtraTemplate} from './view/films-extra.js';
import {createPopupCommentTemplate} from './view/popup-comment.js';

const FILMS_CARD_COUNT = 5;
const FILMS_CARD_EXTRA = 2;
const COMMENTS_COUNT = 4;

const FilmTitles = {
  TOP: 'Top rated',
  COMMENTED: 'Most commented',
};

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const statsElement = footerElement.querySelector('.footer__statistics');

const renderCards = (place, amount) => {
  for (let i = 0; i < amount; i++) {
    render(place, createFilmCardTemplate());
  }
};

render(headerElement, createProfileTemplate());

render(mainElement, createMenuTemplate());

render(mainElement, createFilterTemplate());

render(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector('.films');
const filmsContainerElement = filmsElement.querySelector('.films-list__container');

renderCards(filmsContainerElement, FILMS_CARD_COUNT);

render(filmsContainerElement, createShowMoreTemplate(), PlaceTypes.AFTER);

render(filmsElement, createFilmExtraTemplate(FilmTitles.TOP));

render(filmsElement, createFilmExtraTemplate(FilmTitles.COMMENTED));

const filmsExtraContainerElements = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < FILMS_CARD_EXTRA; i++) {
  renderCards(filmsExtraContainerElements[i], FILMS_CARD_EXTRA);
}

render(footerElement, createPopupTemplate(), PlaceTypes.AFTER);

const popupCommentsElement = document.querySelector('.film-details__comments-list');

for (let i = 0; i < COMMENTS_COUNT; i++) {
  render(popupCommentsElement, createPopupCommentTemplate());
}

render(statsElement, createFilmsAmountTemplate());
