const createOfferTemplate = ({ id, title, price, isChecked }) => {
  const checkBoxDataTitle = title.split(' ').map((word) => word.toLowerCase()).join('-');
  return /*html*/`<div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-${ checkBoxDataTitle }-1"
      type="checkbox"
      name="event-offer-${ checkBoxDataTitle }"
      ${ isChecked ? 'checked' : ''}
      data-id="${ id }"
    >
    <label class="event__offer-label" for="event-offer-${ checkBoxDataTitle }-1">
      <span class="event__offer-title">${ title }</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${ price }</span>
    </label>
  </div>`;
};
const createOffersTemplate = (checkedTypeOffers) => checkedTypeOffers.map((typeOffer) => createOfferTemplate(typeOffer)).join('');
const createOffersSectionTemplate = (checkedTypeOffers) => /*html*/`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">${ createOffersTemplate(checkedTypeOffers) }</div>
  </section>`;

export { createOffersSectionTemplate };
