import {RenderPosition, render, remove} from '../utils/render.js';
import {sortFilmByDate, sortFilmByRating} from '../utils/film.js';
import {filter} from '../utils/filter.js';
import {SortType, ExtraSection, UserAction, UpdateType, FilterType} from '../const.js';
import FilmsView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import FilmsContainerView from '../view/films-container.js';
import FilmExtraView from '../view/films-extra.js';
import NoFilmView from '../view/no-film.js';
import SortView from '../view/sort.js';
import ShowMoreView from '../view/show-more.js';
import FilmPresenter from './film.js';

const FILM_COUNT_PER_STEP = 5;
const FILMS_CARD_EXTRA = 2;

export default class Films {
  constructor (filmsContainer, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmsContainer = filmsContainer;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.DEFAULT;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._filmPresenter = new Map();
    this._filmTopRatedPresenter = new Map();
    this._filmMostCommentedPresenter = new Map();

    this._sortComponent = null;
    this._showMoreComponent = null;
    this._noFilmComponent = null;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();

    this._filmsRatedListComponent = new FilmExtraView(ExtraSection.RATED);
    this._filmsCommentedListComponent = new FilmExtraView(ExtraSection.COMMENTED);

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsTopRatedContainerComponent = new FilmsContainerView();
    this._filmsMostCommentedContainerComponent = new FilmsContainerView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreClick = this._handleShowMoreClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderFilmInterface(films);
  }

  _getPresenters() {
    return [this._filmPresenter, this._filmTopRatedPresenter, this._filmMostCommentedPresenter];
  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredTasks = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredTasks.sort(sortFilmByDate);
      case SortType.RATING:
        return filteredTasks.sort(sortFilmByRating);
    }
    return filteredTasks;
  }

  _handleModeChange() {
    this._getPresenters().map((presenter) => presenter.forEach((item) => item.resetView()));
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearBoard({resetRenderedFilmCount: true});
    this._renderFilmInterface();
  }

  _handleViewAction(actionType, updateType, update, mode) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update, mode);
        break;
    }
  }

  _handleModelEvent(updateType, data, mode) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter.get(data.id).init(data, updateType, mode);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderFilmInterface(updateType, mode);
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmInterface(updateType, mode);
        break;
    }
  }

  _getFilmPresenters() {
    return [this._filmPresenter, this._filmRatedPresenter, this._filmCommentedPresenter];
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._filmsComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderFilm(film, container, presenter, updateType, mode) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film, updateType, mode);
    presenter.set(film.id, filmPresenter);
  }

  _renderFilms(films, updateType, mode) {
    films.forEach((film) => this._renderFilm(film, this._filmsContainerComponent, this._filmPresenter, updateType, mode));
  }


  _renderTopRatedFilms(from, to) {
    this._topRatedFilms.slice(from, to).forEach((film) => this._renderFilm(film, this._filmsTopRatedContainerComponent, this._filmTopRatedPresenter));
  }

  _renderMostCommentedFilms(from, to) {
    this._mostCommentedFilms.slice(from, to).forEach((film) => this._renderFilm(film, this._filmsMostCommentedContainerComponent, this._filmMostCommentedPresenter));
  }

  _renderNoFilms() {
    this._noFilmComponent = new NoFilmView(this._filterType);
    render(this._filmsContainer, this._noFilmComponent);
  }

  _handleShowMoreClick () {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreComponent);
    }
  }

  _renderShowMore() {
    if (this._showMoreComponent !== null) {
      this._showMoreComponent = null;
    }

    this._showMoreComponent = new ShowMoreView();
    this._showMoreComponent.setClickHandler(this._handleShowMoreClick);
    render(this._filmsListComponent, this._showMoreComponent);
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

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();

    remove(this._filmsComponent);
    remove(this._filmsListComponent);
    remove(this._filmsContainerComponent);
    remove(this._sortComponent);
    remove(this._showMoreComponent);

    if (this._noFilmComponent) {
      remove(this._noFilmComponent);
    }

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmInterface(updateType, mode) {
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListComponent);
    render(this._filmsListComponent, this._filmsContainerComponent);

    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)), updateType, mode);

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMore();
    }
  }

  destroy() {
    this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }
}
