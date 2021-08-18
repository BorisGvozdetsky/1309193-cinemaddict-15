import {render, PlaceTypes} from './dom-utils.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import ProfileView from './view/profile.js';
import FilmCardView from './view/film-card.js';
import PopupView from './view/popup.js';
import FilmsAmountView from './view/films-amount.js';
import ShowMoreView from './view/show-more.js';
import FilmExtraView from './view/films-extra.js';
import {generateFilmCard} from './mock/film-card.js';

const FILMS_CARD_TOTAL = 15;
const FILMS_CARD_COUNT = 5;
const FILMS_LIST_EXTRA = 2;
const FILMS_CARD_EXTRA = 2;
const FILM_COUNT_PER_STEP = 5;

const FilmTitles = {
  TOP: 'Top rated',
  COMMENTED: 'Most commented',
};

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.main');
const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer');
const statsElement = footerElement.querySelector('.footer__statistics');

const filmToFilterMap = {
  all: (movies) => movies.length,
  watchlist: (movies) => movies.filter((film) => film.userDetails.watchlist).length,
  alreadyWatched: (movies) => movies.filter((film) => film.userDetails.alreadyWatched).length,
  favorite: (movies) => movies.filter((film) => film.userDetails.favorite).length,
};

const generateFilter = (movies) => Object.entries(filmToFilterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(movies),
  }),
);

const renderFilm = (place, film) => {
  const filmComponent = new FilmCardView(film);
  const popupComponent = new PopupView(film);

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      popupComponent.removeElement();
      bodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  const openPopup = (evt) => {
    evt.preventDefault();
    bodyElement.appendChild(popupComponent.getElement());
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onDocumentKeydown);
  };

  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', openPopup);
  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', openPopup);
  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', openPopup);

  popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    popupComponent.removeElement();
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  render(place, filmComponent.getElement());

};

const films = new Array(FILMS_CARD_TOTAL).fill(null).map((_, index) => generateFilmCard(index));
const filters = generateFilter(films);

render(headerElement, new ProfileView().getElement());

render(mainElement, new MenuView(filters).getElement());

render(mainElement, new SortView().getElement());

render(mainElement, new FilmsView().getElement());

const filmsElement = mainElement.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmsContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_CARD_COUNT); i++) {
  renderFilm(filmsContainerElement, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(filmsListElement, new ShowMoreView().getElement(), PlaceTypes.BEFOREEND);
  const showMoreButton = filmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', () => {
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsContainerElement, film));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsElement, new FilmExtraView(FilmTitles.TOP).getElement());
render(filmsElement, new FilmExtraView(FilmTitles.COMMENTED).getElement());

const filmsExtraContainerElements = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_LIST_EXTRA); i++) {
  for (let j = 0; j < Math.min(films.length, FILMS_CARD_EXTRA); j++) {
    renderFilm(filmsExtraContainerElements[i], films[j]);
  }
}

render(statsElement, new FilmsAmountView(FILMS_CARD_TOTAL).getElement());
