import { createElement } from '../../render.js';
import { createEditEventTemplate } from './event-edit-template.js';
import { POINT_TYPE } from '../../const.js';

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

export default class EditEventView {
  constructor(point = DEFAULT_POINT) {
    this.point = point;
  }

  getTemplate() {
    return createEditEventTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
