import AbstractView from './abstract.js';

const createFilmsListTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
);

class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }
}

export default FilmsList;
