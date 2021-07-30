import {createFilmCardTemplate} from './film-card.js';

const createFilmsTitle = () => (
  '<h2 class="films-list__title">Top rated</h2>'
);

const createFilmExtraTemplate = () => (
  `<section class="films-list films-list--extra">
    ${createFilmsTitle()}
    <div class="films-list__container">
      ${createFilmCardTemplate()}
      ${createFilmCardTemplate()}
    </div>
  </section>`
);

export {createFilmExtraTemplate};
