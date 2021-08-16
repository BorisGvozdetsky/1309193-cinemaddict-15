import {createElement} from '../dom-utils.js';

const createFilmExtraTemplate = (title) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class FilmExtra {
  constructor(title) {
    this.title = title;
    this._element = null;
  }

  getTemplate() {
    return createFilmExtraTemplate(this.title);
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
