import { createPointTemplate } from './point-template.js';
import AbstractView from '../../framework/view/abstract-view.js';
export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #hadleEditClick = null;
  #hadleFavoriteClick = null;
  #allOffers = null;

  constructor({ point, destinations, allOffers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#allOffers = allOffers;
    this.#hadleEditClick = onEditClick;
    this.#hadleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#allOffers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#hadleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#hadleFavoriteClick();
  };
}
