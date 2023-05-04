import { createOfferTemplate } from './offer-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class OfferView extends AbstractView {
  get template() {
    return createOfferTemplate();
  }
}
