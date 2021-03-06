import {render, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType, MenuItem} from '../const.js';
import ProfileView from '../view/profile.js';
import FilterView from '../view/menu.js';

class Filter {
  constructor(headerContainer, filterContainer, filterModel, filmsModel, menuClickHandler) {
    this._filterContainer = filterContainer;
    this._headerContainer = headerContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._menuClickHandler = menuClickHandler;
    this._menuType = MenuItem.FILMS;

    this._menuItem = MenuItem.FILMS;

    this._filterComponent = null;
    this._profileComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleMenuTypeChange = this._handleMenuTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  _getWatchedFilms() {
    return this._getFilters().find((item) => item.type === FilterType.HISTORY).count;
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: 'All Movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    const prevProfileComponent = this._profileComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._profileComponent = new ProfileView(this._getWatchedFilms());

    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setMenuTypeChangeHandler(this._handleMenuTypeChange);

    if (prevFilterComponent === null && prevProfileComponent === null) {
      render(this._filterContainer, this._filterComponent);
      render(this._headerContainer, this._profileComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    replace(this._profileComponent, prevProfileComponent);

    remove(prevFilterComponent);
    remove(prevProfileComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleMenuTypeChange(menuType) {
    if (this._menuType === menuType) {
      return;
    }
    this._menuType = menuType;
    this._handleModelEvent();
    this._menuClickHandler(menuType);
  }
}

export default Filter;
