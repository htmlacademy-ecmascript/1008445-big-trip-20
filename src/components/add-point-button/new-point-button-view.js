import { createNewPointButtonTemplate } from './new-point-button-tempate.js';
import AbstractView from '../../framework/view/abstract-view.js';
import { UpdateType } from '../../const.js';

export default class newPointButtonView extends AbstractView {
  #handleClick = null;
  #pointModel = null;

  constructor({ onClick, pointModel}) {
    super();
    this.#pointModel = pointModel;
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #handleModelEvent = (updateType) => {
    this.element.disabled = updateType === UpdateType.NOT_RESPONSE;
  };
}
