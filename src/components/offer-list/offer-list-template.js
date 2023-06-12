const createOfferTemplate = ({ title, price }) =>
/*html*/`<li class="event__offer">
  <span class="event__offer-title">${ title }</span>
    &plus;&euro;&nbsp;
  <span class="event__offer-price">${ price }</span>
  </li>`;
const createOffersTemplate = (offers) => offers.map((offer) => createOfferTemplate(offer)).join('');
const createOffersListTemplate = (offers) => {
  const offersTemplate = createOffersTemplate(offers);
  return `<ul class="event__selected-offers">${ offersTemplate }</ul>`;
};

export { createOffersListTemplate };
