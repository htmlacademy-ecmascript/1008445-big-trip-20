import { createEditPointTemplate } from './point-edit-template.js';
import { POINT_TYPE } from '../../const.js';
import AbstractView from '../../framework/view/abstract-view.js';

const DEFAULT_POINT = {
  type: POINT_TYPE[5],
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

export default class EditPointView extends AbstractView {
  #point = null;
  #hadleFormSumbit = null;

  constructor({ point = DEFAULT_POINT, onFormSubmit }) {
    super();
    this.#point = point;
    this.#hadleFormSumbit = onFormSubmit;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#hadleFormSumbit();
  };
}
