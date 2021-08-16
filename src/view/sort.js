import {createElement} from '../dom-utils.js';

const isActiveClassName = (condition) => condition ? 'sort__button--active' : '';

const createSortItemTemplate = (type, isActive) => (
  `<li><a href="#" class="sort__button ${isActiveClassName(isActive)}">Sort by ${type}</a></li>`
);

const createSortTemplate = (types, activeType) => {
  const sortItemsTemplate = types.map((type) => createSortItemTemplate(type, type === activeType)).join('');

  return `<ul class="sort">${sortItemsTemplate}</ul>`;
};

export default class Sort {
  constructor(types, activeType) {
    this._types = types;
    this._activeType = activeType;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._types, this._activeType);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
