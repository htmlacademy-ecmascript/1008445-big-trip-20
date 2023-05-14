const createOfferTemplate = ({ title, price }) => {
  const checkBoxDataTitle = title.split(' ').map((word) => word.toLowerCase()).join('-');
  return /*html*/`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${ checkBoxDataTitle }-1" type="checkbox" name="event-offer-${ checkBoxDataTitle }">
    <label class="event__offer-label" for="event-offer-${ checkBoxDataTitle }-1">
      <span class="event__offer-title">${ title }</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${ price }</span>
    </label>
  </div>`;
};
const createOffersTemplate = (offers) => offers.map((offer) => createOfferTemplate(offer)).join('');
const createOffersSectionTemplate = (offers) => /*html*/`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">${ createOffersTemplate(offers) }</div>
  </section>`;

export { createOffersSectionTemplate };
