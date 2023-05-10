import { createEditPointTemplate } from './point-edit-template.js';
import { POINT_TYPE } from '../../const.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { mockDestanations, mockOffers } from '../../mock/points.js';

const DEFAULT_POINT = {
  type: POINT_TYPE[0],
  destanation: {
    name: 'Las Vegas',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=4',
        description: 'Lorem ipsum dolor sit amet,'
      },
      {
        src: 'https://loremflickr.com/248/152?random=5',
        description: 'Lorem ipsum dolor sit amet,'
      }
    ]
  },
  dateFrom: '2023-03-19T19:00:00',
  dateTo: '2023-03-19T20:20:00',
  isFavorite: false,
  price: 100,
  offers: [
    {
      title: 'Add luggage',
      price: 30,
    },
    {
      title: 'Switch to comfort class',
      price: 100,
    },
    {
      title: 'Add meal',
      price: 15,
    },
  ],
};

export default class EditPointView extends AbstractStatefulView {
  #datepicker = null;
  #hadleFormSumbit = null;
  #hadleFormRollup = null;

  constructor({ point = DEFAULT_POINT, onFormSubmit, onFormRollup }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#hadleFormSumbit = onFormSubmit;
    this.#hadleFormRollup = onFormRollup;
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

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
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
      .addEventListener('change', this.#destanationHandler);

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
    this._setState({
      price: evt.target.value
    });
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
    evt.preventDefault();
    const destanation = mockDestanations.find((dest) => dest.name === evt.target.value);
    if (destanation) {
      this.updateElement({
        destanation
      });
    }
  };

  #dateFromChangeHandler = ([ userDateFrom ]) => {
    this.updateElement({
      dateFrom: userDateFrom
    });
  };

  #setDatePicker() {
    if (this._state.dateFrom) {
      this.#datepicker = flatpickr(
        this.element.querySelector('input[name="event-start-time"]'),
        {
          dateFormat: 'j F',
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler
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
