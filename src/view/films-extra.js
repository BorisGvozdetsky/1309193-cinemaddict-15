import AbstractView from './abstract.js';

const createFilmExtraTemplate = (title) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
  </section>`
);

class FilmExtra extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createFilmExtraTemplate(this._title);
  }
}

export default FilmExtra;
