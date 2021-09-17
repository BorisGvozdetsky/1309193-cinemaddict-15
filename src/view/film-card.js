import AbstractView from './abstract.js';
import {humanizeDateFilm, humanizeRuntime} from '../utils/film.js';

const createFilmCardTemplate = (film) => {
  const filmYear = humanizeDateFilm(film.filmInfo.release.date);
  const runtime = humanizeRuntime(film.filmInfo.runtime);
  return `<article class="film-card" id="${film.id}">
    <h3 class="film-card__title">${film.filmInfo.title}</h3>
    <p class="film-card__rating">${film.filmInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmYear}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${film.filmInfo.genre[0]}</span>
    </p>
    <img src="./images/posters/${film.filmInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${film.filmInfo.description}</p>
    <a class="film-card__comments">${film.comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${(film.userDetails.watchlist) ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched  ${(film.userDetails.alreadyWatched) ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite  ${(film.userDetails.favorite) ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
    </div>
    </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._openPopupHandler = this._openPopupHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _openPopupHandler(evt) {
    evt.preventDefault();
    this._callback.openPopup();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick(this._film);
  }

  _alreadyWatchedClickHandler() {
    this._callback.alreadyWatchedClick(this._film);
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick(this._film);
  }

  setOpenPopupHandler(callback) {
    this._callback.openPopup = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openPopupHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openPopupHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }
}
