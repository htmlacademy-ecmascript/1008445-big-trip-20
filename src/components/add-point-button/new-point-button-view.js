import { createNewPointButtonTemplate } from './new-point-button-tempate.js';
import AbstractView from '../../framework/view/abstract-view.js';
import { UpdateType } from '../../const.js';

export default class newPointButtonView extends AbstractView {
  #handleSaveClick = null;
  #pointModel = null;

  constructor({ onSave, pointModel}) {
    super();
    this.#pointModel = pointModel;
    this.#handleSaveClick = onSave;
    this.element.addEventListener('click', this.#clickHandler);
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveClick();
  };

  #handleModelEvent = (updateType) => {
    this.setDisabled(updateType === UpdateType.NOT_RESPONSE);
  };

  setDisabled = (isDisabled) => {
    this.element.disabled = isDisabled;
  };
}
