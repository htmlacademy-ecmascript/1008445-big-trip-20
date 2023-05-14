import { createEditPointTemplate } from './point-edit-template.js';
import { POINT_TYPE } from '../../const.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { humanizePointDateAndTime, setDefaultPointDateAndTime } from '../../utils/point.js';
const DEFAULT_TYPE = POINT_TYPE[0];
export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #dateFromPicker = null;
  #offers = null;
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

  constructor({ point, destinations, offers, onFormSubmit, onFormRollup, onDeleteClick }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    if (!point) {
      point = this.emptyPoint;
    }
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSumbit = onFormSubmit;
    this.#handleFormRollup = onFormRollup;
    this.#onDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  get emptyPoint() {
    const defaultOffers = this.#offers.find((offer) => offer.type === DEFAULT_TYPE);
    return {
      type: DEFAULT_TYPE,
      destination: '',
      dateFrom: '',
      dateTo: '',
      isFavorite: false,
      price: '',
      offers: defaultOffers ? defaultOffers.offers : [],
    };
  }

  get template() {
    return createEditPointTemplate(EditPointView.parseStateToPoint(this._state), this.#destinations);
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

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formRollupHandler);

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

    this.#setDatePicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSumbit(this._state);
  };

  #formRollupHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormRollup(evt);
  };

  #priceHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    if (value) {
      evt.target.value = value.replace(/\D/g, '');
    }
    this._setState({
      price: evt.target.value
    });
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
      const pointType = pointLabelType.replace('event__type-label--', '');
      if (POINT_TYPE.includes(pointType)) {
        const { offers } = this.#offers.find((offer) => offer.type === pointType);
        this.updateElement({
          type: pointType,
          offers
        });
      }
    }
  };

  #destinationHandler = (evt) => {
    let newDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    if (!newDestination) {
      evt.target.value = '';
      newDestination = '';
    }
    this.updateElement({
      destination: newDestination
    });
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

  static parsePointToState(state) {
    return { ...state };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    return point;
  }
}
