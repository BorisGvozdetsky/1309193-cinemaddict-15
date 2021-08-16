import {createElement} from '../dom-utils.js';

const createFilmsAmountTemplate = (amount) => `<p>${amount} movies inside</p>`;

export default class Amount {
  constructor(amount) {
    this.amount = amount;
    this._element = null;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this.amount);
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
