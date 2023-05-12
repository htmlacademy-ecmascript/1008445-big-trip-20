import { createNoPointTemplate } from './no-point-template.js';
import AbstractView from '../../framework/view/abstract-view.js';
export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
