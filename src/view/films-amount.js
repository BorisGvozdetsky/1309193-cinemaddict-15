import AbstractView from './abstract.js';

const createFilmsAmountTemplate = (amount) => `<p>${amount} movies inside</p>`;

export default class FilmsAmount extends AbstractView {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._amount);
  }
}
