import AbstractObserver from '../utils/abstract-observer.js';
import {FilterType} from '../const.js';

class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  getFilter() {
    return this._activeFilter;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }
}

export default Filter;
