import { createPointTemplate } from './point-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class PointView extends AbstractView {
  #point = null;
  #hadleEditClick = null;

  constructor({ point, onEditClick }) {
    super();
    this.#point = point;
    this.#hadleEditClick = onEditClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#hadleEditClick();
  };
}
