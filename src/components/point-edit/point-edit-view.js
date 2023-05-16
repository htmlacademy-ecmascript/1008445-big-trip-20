import { createEditPointTemplate } from './point-edit-template.js';
import { POINT_TYPE } from '../../const.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { humanizePointDateAndTime, setDefaultPointDateAndTime, findOfferByType } from '../../utils/point.js';

const EMPTY_POINT = {
  type: POINT_TYPE[0],
  destination: '',
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  price: '',
  offers: []
};

export default class EditPointView extends AbstractStatefulView {
  #isNewPoint = false;
  #destinations = null;
  #dateFromPicker = null;
  #allOffers = null;
  #dateToPicker = null;
  #handleFormSumbit = null;
  #handleFormRollup = null;
  #onDeleteClick = null;
  #datePickerConfig = {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    // eslint-disable-next-line camelcase
    time_24hr: true
  };

  constructor({ point, destinations, allOffers, onFormSubmit, onFormRollup, onDeleteClick }) {
    super();
    this.#destinations = destinations;
    this.#allOffers = allOffers;
    if (!point) {
      point = EMPTY_POINT;
    }
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSumbit = onFormSubmit;
    if (!onFormRollup) {
      this.#isNewPoint = true;
    }
    this.#handleFormRollup = onFormRollup;
    this.#onDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations, this.#allOffers, this.#isNewPoint);
  }

  reset(point) {
    this.updateElement(EditPointView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  _restoreHandlers() {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    if (!this.#isNewPoint) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#formRollupHandler);
    }

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#priceHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('click', this.#pointTypeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteHandler);

    const availableOffersElement = this.element.querySelector('.event__available-offers');
    if (availableOffersElement) {
      availableOffersElement.addEventListener('click', this.#offersHandler);
    }

    this.#setDatePicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSumbit(EditPointView.parseStateToPoint(this._state));
  };

  #formRollupHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormRollup(evt);
  };

  #offersHandler = (evt) => {
    if (evt.target.matches('.event__offer-checkbox')) {
      const offerId = evt.target.dataset.id;
      const typeOffers = findOfferByType(this._state.type, this.#allOffers);
      const offer = typeOffers.offers.find((typeOffer) => typeOffer.id === offerId);
      const offers = evt.target.checked
        ? [ ...this._state.offers, offer ]
        : this._state.offers.filter((stateOffer) => stateOffer.id !== offerId);

      this._setState({ offers });
    }
  };

  #priceHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    if (value) {
      evt.target.value = value.replace(/\D/g, '');
    }
    this._setState({ price: evt.target.value });
  };

  #deleteHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #pointTypeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.matches('.event__type-label')) {
      // eslint-disable-next-line no-unused-vars
      const [ _, pointLabelType ] = evt.target.className.split('  ');
      const type = pointLabelType.replace('event__type-label--', '');
      if (POINT_TYPE.includes(type)) {
        this.updateElement({ type });
      }
    }
  };

  #destinationHandler = (evt) => {
    let destination = this.#destinations.find(({ name }) => evt.target.value === name);
    if (!destination) {
      evt.target.value = '';
      destination = '';
    }
    this.updateElement({ destination });
  };

  #dateFromChangeHandler = ([ userDateFrom ]) => {
    this.updateElement({
      dateFrom: setDefaultPointDateAndTime(userDateFrom)
    });
  };

  #dateToChangeHandler = ([ userDateTo ]) => {
    this.updateElement({
      dateTo: setDefaultPointDateAndTime(userDateTo)
    });
  };

  #setDatePicker() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        ...this.#datePickerConfig,
        defaultDate: humanizePointDateAndTime(this._state.dateFrom),
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#dateToPicker = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        ...this.#datePickerConfig,
        defaultDate: humanizePointDateAndTime(this._state.dateTo),
        onChange: this.#dateToChangeHandler
      }
    );
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
