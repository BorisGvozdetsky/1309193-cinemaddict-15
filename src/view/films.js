import {createFilmCardTemplate} from './film-card.js';
import {createShowMoreTemplate} from './show-more.js';
import {createFilmExtraTemplate} from './films-extra.js';

const createFilmsTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
        ${createFilmCardTemplate()}
        ${createFilmCardTemplate()}
        ${createFilmCardTemplate()}
        ${createFilmCardTemplate()}
        ${createFilmCardTemplate()}
      </div>
      ${createShowMoreTemplate()}
    </section>
    ${createFilmExtraTemplate()}
    ${createFilmExtraTemplate()}
  </section>`
);

export {createFilmsTemplate};
