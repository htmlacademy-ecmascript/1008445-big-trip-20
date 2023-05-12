import { createNewPointButtonTemplate } from './new-point-button-tempate.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class newPointButtonView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
