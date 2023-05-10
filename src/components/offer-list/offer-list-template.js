import { createOfferTemplate } from '../offer/offer-template';
const createOffersTemplate = (offers) => offers.map((offer) => createOfferTemplate(offer)).join('');

function createOfferListTemplate({ offers }) {
  const offersTemplate = createOffersTemplate(offers);
  return /*html*/`<ul class="event__selected-offers">
    ${ offersTemplate }
    </ul>`;
}

export { createOfferListTemplate };
