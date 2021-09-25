import AbstractView from './abstract.js';

const createFilmsAmountTemplate = (amount) => `<p>${amount} movies inside</p>`;

class FilmsAmount extends AbstractView {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._amount);
  }
}

export default FilmsAmount;
