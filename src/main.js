import {render, remove} from './utils/render.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import ProfileView from './view/profile.js';
import FilmCardView from './view/film-card.js';
import PopupView from './view/popup.js';
import FilmsAmountView from './view/films-amount.js';
import ShowMoreView from './view/show-more.js';
import FilmExtraView from './view/films-extra.js';
import NoFilmView from './view/no-film.js';
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
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(movies),
  }),
);

const renderFilm = (place, film) => {
  const filmComponent = new FilmCardView(film);
  const popupComponent = new PopupView(film);

  const closePopup = () => {
    remove(popupComponent);
    bodyElement.classList.remove('hide-overflow');
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = () => {
    bodyElement.appendChild(popupComponent.getElement());
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onDocumentKeydown);
    popupComponent.setClickHandler(closePopup);
  };

  filmComponent.setClickHandler(openPopup);

  render(place, filmComponent);

};

const films = new Array(FILMS_CARD_TOTAL).fill(null).map((_, index) => generateFilmCard(index));
const filters = generateFilter(films);

render(headerElement, new ProfileView());

render(mainElement, new MenuView(filters));

render(mainElement, new SortView());


if (films.length === 0) {
  render(mainElement, new NoFilmView());

} else {
  render(mainElement, new FilmsView());

  const filmsElement = mainElement.querySelector('.films');
  const filmsListElement = filmsElement.querySelector('.films-list');
  const filmsContainerElement = filmsElement.querySelector('.films-list__container');

  for (let i = 0; i < Math.min(films.length, FILMS_CARD_COUNT); i++) {
    renderFilm(filmsContainerElement, films[i]);
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    const showMoreComponent = new ShowMoreView();
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    render(filmsListElement, showMoreComponent);

    showMoreComponent.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsContainerElement, film));
      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        remove(showMoreComponent);
      }
    });

  }

  render(filmsElement, new FilmExtraView(FilmTitles.TOP));

  render(filmsElement, new FilmExtraView(FilmTitles.COMMENTED));

  const filmsExtraContainerElements = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

  for (let i = 0; i < Math.min(films.length, FILMS_LIST_EXTRA); i++) {
    for (let j = 0; j < Math.min(films.length, FILMS_CARD_EXTRA); j++) {
      renderFilm(filmsExtraContainerElements[i], films[j]);
    }
  }
}

render(statsElement, new FilmsAmountView(FILMS_CARD_TOTAL));
