import AbstractView from './abstract.js';

const createFilmsContainerTemplate = () => '<div class="films-list__container"></div>';

class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}

export default FilmsContainer;
