import { createAddOrEditPointButtonTemplate } from './add-or-edit-point-button-tempate.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class AddOrEditPointButtonView extends AbstractView {
  #hadnleClick = null;

  constructor({ onClick }) {
    super();
    this.#hadnleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createAddOrEditPointButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#hadnleClick();
  };
}
