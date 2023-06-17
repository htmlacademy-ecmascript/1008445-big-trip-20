import { createEditPointTemplate } from './point-edit-template.js';
import { POINT_TYPE, EditType } from '../../const.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { findOfferByType } from '../../utils/point.js';

const EMPTY_POINT = {
  type: POINT_TYPE[0],
  destination: '',
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  price: 0,
  offers: []
};

export default class PointEditView extends AbstractStatefulView {
  #editType = null;
  #destinations = null;
  #dateFromPicker = null;
  #allOffers = null;
  #dateToPicker = null;
  #handleFormSumbit = null;
  #handleFormRollup = null;
  #onDeleteClick = null;
  #onCancelClick = null;
  #datePickerConfig = {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    'time_24hr': true,
    locale: {
      firstDayOfWeek : 1
    },
  };

  constructor({ point = EMPTY_POINT, destinations, allOffers, onFormSubmit, onFormRollup, onDeleteClick, onCancelClick, editType = EditType.EDITING }) {
    super();
    this.#destinations = destinations;
    this.#allOffers = allOffers;
    this._setState(PointEditView.parsePointToState(point));
    this.#handleFormSumbit = onFormSubmit;
    this.#editType = editType;
    this.#handleFormRollup = onFormRollup;
    this.#onDeleteClick = onDeleteClick;
    this.#onCancelClick = onCancelClick;
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations, this.#allOffers, this.#editType);
  }

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
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

    if (this.#editType === EditType.EDITING) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#formRollupClickHandler);

      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#deleteClickHandler);
    }

    if (this.#editType === EditType.CREATING) {
      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#resetClickHandler);
    }
    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('click', this.#pointTypeClickHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);


    const availableOffersElement = this.element.querySelector('.event__available-offers');
    if (availableOffersElement) {
      availableOffersElement.addEventListener('click', this.#offerClickHandler);
    }

    this.#setDatePicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSumbit(PointEditView.parseStateToPoint(this._state));
  };

  #formRollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormRollup(evt);
  };

  #offerClickHandler = (evt) => {
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

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    if (value) {
      evt.target.value = value.replace(/\D/g, '');
    }
    this._setState({ price: evt.target.value });
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#onCancelClick();
  };

  #pointTypeClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.matches('.event__type-label')) {
      // eslint-disable-next-line no-unused-vars
      const [ _, pointLabelType ] = evt.target.className.split('  ');
      const type = pointLabelType.replace('event__type-label--', '');
      if (POINT_TYPE.includes(type)) {
        this.updateElement({ type, offers: [] });
      }
    }
  };

  #destinationChangeHandler = (evt) => {
    let destination = this.#destinations.find(({ name }) => evt.target.value === name);
    if (!destination) {
      evt.target.value = '';
      destination = '';
    }
    this.updateElement({ destination });
  };

  #dateFromChangeHandler = ([ userDateFrom ]) => {
    this._setState({ dateFrom: userDateFrom });
    this.#dateToPicker.set('minDate', this._state.dateFrom);
  };

  #dateToChangeHandler = ([ userDateTo ]) => {
    this._setState({ dateTo: userDateTo });
    this.#dateFromPicker.set('maxDate', this._state.dateTo);
  };

  #setDatePicker() {
    const [ dateFromElement, dateToElement ] = this.element.querySelectorAll('.event__input--time');
    this.#dateFromPicker = flatpickr(
      dateFromElement,
      {
        ...this.#datePickerConfig,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onClose: this.#dateFromChangeHandler
      }
    );

    this.#dateToPicker = flatpickr(
      dateToElement,
      {
        ...this.#datePickerConfig,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#dateToChangeHandler
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
