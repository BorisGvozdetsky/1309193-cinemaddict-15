import {render, PlaceTypes} from './dom-utils.js';
import {createMenuTemplate} from './view/menu.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmsTemplate} from './view/films.js';
import {createProfileTemplate} from './view/profile.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createPopupTemplate} from './view/popup.js';
import {createFilmsAmountTemplate} from './view/films-amount.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createFilmExtraTemplate} from './view/films-extra.js';
import {createPopupCommentTemplate} from './view/popup-comment.js';
import {generateFilmCard} from './mock/film-card.js';
import {createGenreTemplate} from './view/genre.js';
import {generateFilter} from './mock/filter.js';

const FILMS_CARD_TOTAL = 15;

const FILMS_CARD_COUNT = 5;
const FILMS_CARD_EXTRA = 2;
const FILM_COUNT_PER_STEP = 5;

const SORT_TYPES = ['default', 'date', 'rating'];

const FilmTitles = {
  TOP: 'Top rated',
  COMMENTED: 'Most commented',
};

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const statsElement = footerElement.querySelector('.footer__statistics');

const filmCards = new Array(FILMS_CARD_TOTAL).fill(null).map((_, index) => generateFilmCard(index));
const filters = generateFilter(filmCards);

const renderCards = (place, amount) => {
  for (let i = 0; i < amount; i++) {
    render(place, createFilmCardTemplate(filmCards[i]));
  }
};

render(headerElement, createProfileTemplate());

render(mainElement, createMenuTemplate(filters, filters[0].name));

render(mainElement, createSortTemplate(SORT_TYPES, SORT_TYPES[0]));

render(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector('.films');
const filmsContainerElement = filmsElement.querySelector('.films-list__container');

renderCards(filmsContainerElement,FILMS_CARD_COUNT);

if (filmCards.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(filmsContainerElement, createShowMoreTemplate(), PlaceTypes.AFTER);

  const showMoreButton = filmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', () => {
    filmCards
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((itm) => render(filmsContainerElement, createFilmCardTemplate(itm)));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsElement, createFilmExtraTemplate(FilmTitles.TOP));

render(filmsElement, createFilmExtraTemplate(FilmTitles.COMMENTED));

const filmsExtraContainerElements = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < FILMS_CARD_EXTRA; i++) {
  renderCards(filmsExtraContainerElements[i], FILMS_CARD_EXTRA);
}

render(footerElement, createPopupTemplate(filmCards[0]), PlaceTypes.AFTER);

const popupCommentsElement = document.querySelector('.film-details__comments-list');
const filmsGenreElement = document.querySelector('.film-details__row-genre .film-details__cell');

for (let i = 0; i < filmCards[0].filmInfo.genre.length; i++) {
  render(filmsGenreElement, createGenreTemplate(filmCards[0].filmInfo.genre[i]));
}

for (let i = 0; i < filmCards[0].comments.length; i++) {
  render(popupCommentsElement, createPopupCommentTemplate(filmCards[0].comments[i]));
}

render(statsElement, createFilmsAmountTemplate(FILMS_CARD_TOTAL));
