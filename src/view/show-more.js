import AbstractView from './abstract.js';

const createShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMore extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}

export default ShowMore;
