import {RenderPosition, render, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {sortFilmByDate, sortFilmByRating, sortFilmByComments} from '../utils/film.js';
import {SortType, FilmTitles} from '../const.js';
import FilmsView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import FilmsContainerView from '../view/films-container.js';
import FilmExtraView from '../view/films-extra.js';
import NoFilmView from '../view/films.js';
import SortView from '../view/sort.js';
import ShowMoreView from '../view/show-more.js';
import FilmPresenter from './film.js';

const FILM_COUNT_PER_STEP = 5;
const FILMS_CARD_EXTRA = 2;


export default class Films {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = new Map();
    this._filmTopRatedPresenter = new Map();
    this._filmMostCommentedPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._noFilmsComponent = new NoFilmView();
    this._filmsTopRatedListComponent = new FilmExtraView(FilmTitles.TOP);
    this._filmsMostCommentedListComponent = new FilmExtraView(FilmTitles.COMMENTED);
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsTopRatedContainerComponent = new FilmsContainerView();
    this._filmsMostCommentedContainerComponent = new FilmsContainerView();
    this._sortComponent = new SortView();
    this._showMoreComponent = new ShowMoreView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreClick = this._handleShowMoreClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._topRatedFilms = films.slice().sort(sortFilmByRating);
    this._mostCommentedFilms = films.slice().sort(sortFilmByComments);

    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListComponent);
    render(this._filmsListComponent, this._filmsContainerComponent);

    this._renderFilmInterface(films);
  }

  _getPresenters() {
    return [this._filmPresenter, this._filmTopRatedPresenter, this._filmMostCommentedPresenter];
  }

  _handleModeChange() {
    this._getPresenters().map((presenter) => presenter.forEach((item) => item.resetView()));
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
    this._renderTopRatedFilmList();
    this._renderMostCommentedFilmList();
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    this._topRatedFilms = updateItem(this._topRatedFilms, updatedFilm);
    this._mostCommentedFilms = updateItem(this._mostCommentedFilms, updatedFilm);

    this._getPresenters().map((presenter) => {
      if (presenter.has(updatedFilm.id)) {
        presenter.get(updatedFilm.id).init(updatedFilm);
      }
    });
  }

  _renderSort() {
    render(this._filmsComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, container, presenter) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    presenter.set(film.id, filmPresenter);
  }

  _renderFilms(from, to) {
    this._films.slice(from, to).forEach((film) => this._renderFilm(film, this._filmsContainerComponent, this._filmPresenter));
  }

  _renderTopRatedFilms(from, to) {
    this._topRatedFilms.slice(from, to).forEach((film) => this._renderFilm(film, this._filmsTopRatedContainerComponent, this._filmTopRatedPresenter));
  }

  _renderMostCommentedFilms(from, to) {
    this._mostCommentedFilms.slice(from, to).forEach((film) => this._renderFilm(film, this._filmsMostCommentedContainerComponent, this._filmMostCommentedPresenter));
  }


  _renderNoFilms() {
    render(this._filmsContainer, this._noFilmsComponent);
  }

  _handleShowMoreClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreComponent);
    }
  }

  _renderShowMore() {
    render(this._filmsListComponent, this._showMoreComponent);
    this._showMoreComponent.setClickHandler(this._handleShowMoreClick);
  }

  _clearFilmList() {
    this._getPresenters().map((presenter) => presenter.forEach((item) => item.destroy()));
    this._getPresenters().forEach((presenter) => presenter.clear());
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreComponent);
  }

  _renderFilmList() {
    this. _renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMore();
    }
  }

  _renderTopRatedFilmList() {
    render(this._filmsComponent, this._filmsTopRatedListComponent);
    render(this._filmsTopRatedListComponent, this._filmsTopRatedContainerComponent);
    this._renderTopRatedFilms(0, Math.min(this._films.length, FILMS_CARD_EXTRA));
  }

  _renderMostCommentedFilmList() {
    render(this._filmsComponent, this._filmsMostCommentedListComponent);
    render(this._filmsMostCommentedListComponent, this._filmsMostCommentedContainerComponent);
    this._renderMostCommentedFilms(0, Math.min(this._films.length, FILMS_CARD_EXTRA));
  }

  _renderFilmInterface() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderFilmList();
    this._renderTopRatedFilmList();
    this._renderMostCommentedFilmList();
  }
}
