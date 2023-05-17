import { capitalizeFirstLetter, humanizePointDateAndTime } from '../../utils/point.js';
import { createDestinationSectionTemplate } from './pictures-template.js';
import { createOffersSectionTemplate } from './offers-list-template.js';
import { createDistinationTempate } from './destination-template.js';
import { createPointTypeListTemplate } from './point-items-template.js';
import { findOfferByType } from '../../utils/point.js';

const createButtonRollupTemplate = () =>
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;

function createEditPointTemplate({ type, destination, dateFrom, dateTo, price, offers, isDisabled, isSaving, isDeleting }, destinations, allOffers, isNewPoint) {
  let destinationName = '';
  let destinationSectionTemplate = '';
  let offersSectionTemplate = '';
  let deleteButtonTitle = '';
  const typeOffers = findOfferByType(type, allOffers);
  const checkedTypeOffers = typeOffers.offers.map((typeOffer) => ({
    ...typeOffer,
    isChecked: !!offers.find((offer) => offer.id === typeOffer.id)
  }));
  const typeTitle = capitalizeFirstLetter(type);
  const pointTypeListTemplate = createPointTypeListTemplate();
  if (destination) {
    const { name, description, pictures } = destination;
    destinationName = name;
    destinationSectionTemplate = createDestinationSectionTemplate(description, pictures);
  }
  const pointDestinationTemplate = createDistinationTempate(destinationName, destinations, isDisabled);
  if (checkedTypeOffers.length) {

    offersSectionTemplate = createOffersSectionTemplate(checkedTypeOffers);
  }
  const buttonRollupTemplate = !isNewPoint ? createButtonRollupTemplate() : '';
  if (isNewPoint) {
    deleteButtonTitle = 'Cancel';
  } else {
    deleteButtonTitle = isDeleting ? 'Deleting...' : 'Delete';
  }

  return /*html*/`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post" ${ isDisabled ? 'disabled' : '' }>
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${ type }.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group" ${ isDisabled ? 'disabled' : '' }>
              <legend class="visually-hidden">Event type</legend>
              ${ pointTypeListTemplate }
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${ typeTitle }
          </label>
          ${ pointDestinationTemplate }
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${ isDisabled ? 'disabled' : '' } value="${ humanizePointDateAndTime(dateFrom) }">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${ isDisabled ? 'disabled' : '' } value="${ humanizePointDateAndTime(dateTo) }">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" ${ isDisabled ? 'disabled' : '' } value="${ price }">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${ isDeleting ? 'disabled' : '' }>${ isSaving ? 'Saving...' : 'Save' }</button>
        <button class="event__reset-btn" type="reset" ${ isSaving ? 'disabled' : '' }>${ deleteButtonTitle }</button>
        ${ buttonRollupTemplate }
      </header>

      <section class="event__details">
        ${ offersSectionTemplate }
        ${ destinationSectionTemplate }
      </section>
    </form>
    </li>`;
}

export { createEditPointTemplate };
