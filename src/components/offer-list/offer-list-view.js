import { createOfferListTemplate } from './offer-list-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class OfferListView extends AbstractView{
  get template() {
    return createOfferListTemplate();
  }
}
