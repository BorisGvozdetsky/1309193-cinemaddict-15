import {render} from './utils/render.js';
import MenuView from './view/menu.js';
import ProfileView from './view/profile.js';
import FilmsAmountView from './view/films-amount.js';
// import FilmExtraView from './view/films-extra.js';
import FilmsPresenter from './presenter/films.js';
import {generateFilmCard} from './mock/film-card.js';

const FILMS_CARD_TOTAL = 15;
// const FILMS_LIST_EXTRA = 2;
// const FILMS_CARD_EXTRA = 2;

// const FilmTitles = {
//   TOP: 'Top rated',
//   COMMENTED: 'Most commented',
// };

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

const films = new Array(FILMS_CARD_TOTAL).fill(null).map((_, index) => generateFilmCard(index));
const filters = generateFilter(films);
const filmsPresenter = new FilmsPresenter(mainElement);

render(headerElement, new ProfileView());

render(mainElement, new MenuView(filters));

filmsPresenter.init(films);


// render(filmsElement, new FilmExtraView(FilmTitles.TOP));

// render(filmsElement, new FilmExtraView(FilmTitles.COMMENTED));

//   const filmsExtraContainerElements = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

//   for (let i = 0; i < Math.min(films.length, FILMS_LIST_EXTRA); i++) {
//     for (let j = 0; j < Math.min(films.length, FILMS_CARD_EXTRA); j++) {
//       renderFilm(filmsExtraContainerElements[i], films[j]);
//     }
//   }
// }

render(statsElement, new FilmsAmountView(FILMS_CARD_TOTAL));
