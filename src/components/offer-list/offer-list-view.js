import { createElement } from '../../render.js';
import { createOfferListTemplate } from './offer-list-template.js';

export default class OfferListView {
  getTemplate() {
    return createOfferListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
