import { createElement } from '../../render.js';
import { createOfferTemplate } from './offer-template.js';

export default class OfferView {
  getTemplate() {
    return createOfferTemplate();
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
