import { createTripInfoTemplate } from './trip-info-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class TripInfoView extends AbstractView {
  #totalPrice = null;
  #tripTitle = null;
  #tripDuration = null;

  constructor({ totalPrice, tripTitle, tripDuration }) {
    super();
    this.#totalPrice = totalPrice;
    this.#tripTitle = tripTitle;
    this.#tripDuration = tripDuration;
  }

  get template() {
    return createTripInfoTemplate(this.#totalPrice, this.#tripTitle, this.#tripDuration);
  }
}
