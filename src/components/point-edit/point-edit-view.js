import { createEditPointTemplate } from './point-edit-template.js';
import { POINT_TYPE } from '../../const.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { mockDestanations, mockOffers } from '../../mock/points.js';
import { getRandomArrayElement } from '../../utils/utils.js';
import { humanizePointDateAndTime, setDefaultPointDateAndTime } from '../../utils/point.js';

const DEFAULT_POINT = {
  type: POINT_TYPE[6],
  destanation: getRandomArrayElement(mockDestanations),
  dateFrom: '2023-05-12T13:00:00',
  dateTo: '2023-05-12T14:20:00',
  isFavorite: false,
  price: 0,
  offers: mockOffers.find((offer) => offer.type === POINT_TYPE[0]),
};

export default class EditPointView extends AbstractStatefulView {
  #dateFromPicker = null;
  #dateToPicker = null;
  #hadleFormSumbit = null;
  #hadleFormRollup = null;
  #onDeleteClick = null;
  #datePickerConfig = {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    // eslint-disable-next-line camelcase
    time_24hr: true
  };

  constructor({ point = DEFAULT_POINT, onFormSubmit, onFormRollup, onDeleteClick }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#hadleFormSumbit = onFormSubmit;
    this.#hadleFormRollup = onFormRollup;
    this.#onDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(EditPointView.parseStateToPoint(this._state));
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
      .querySelector('.event__select--destination')
      .addEventListener('change', this.#destanationHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteHandler);

    this.#setDatePicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#hadleFormSumbit(this._state);
  };

  #formRollupHandler = (evt) => {
    evt.preventDefault();
    this.#hadleFormRollup(evt);
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
        const offers = mockOffers.find((offer) => offer.type === pointType);
        this.updateElement({
          type: pointType,
          offers
        });
      }
    }
  };

  #destanationHandler = (evt) => {
    const destanation = mockDestanations.find((dest) => dest.name === evt.target.value);
    if (destanation) {
      this.updateElement({
        destanation
      });
    }
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
    if (this._state.dateFrom) {
      this.#dateFromPicker = flatpickr(
        this.element.querySelector('input[name="event-start-time"]'),
        {
          ...this.#datePickerConfig,
          defaultDate: humanizePointDateAndTime(this._state.dateFrom),
          onChange: this.#dateFromChangeHandler
        }
      );
    }
    if (this._state.dateTo) {
      this.#dateToPicker = flatpickr(
        this.element.querySelector('input[name="event-end-time"]'),
        {
          ...this.#datePickerConfig,
          defaultDate: humanizePointDateAndTime(this._state.dateTo),
          onChange: this.#dateToChangeHandler
        }
      );
    }
  }

  static parsePointToState(state) {
    return { ...state };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    return point;
  }
}
