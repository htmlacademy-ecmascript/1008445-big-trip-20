import { POINT_TYPE } from '../const.js';
import { getRandomArrayElement } from '../utils/utils.js';
import { nanoid } from 'nanoid';

const mockPoints = [
  {
    id: nanoid(),
    type: getRandomArrayElement(POINT_TYPE),
    destanation: {
      name: 'Amsterdam',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Lorem ipsum dolor sit amet,'
        }
      ]
    },
    dateFrom: '2023-05-05T10:30:00',
    dateTo: '2023-05-05T11:00:00',
    isFavorite: true,
    price: 20,
    offers: [
      {
        title: 'Order Uber',
        price: 20,
      }
    ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(POINT_TYPE),
    destanation: {
      name: 'Chamonix',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Lorem ipsum dolor sit amet,'
        }
      ]
    },
    dateFrom: '2023-05-06T12:25:00',
    dateTo: '2023-05-06T13:35:00',
    isFavorite: false,
    price: 160,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Add meal',
        price: 15,
      }
    ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(POINT_TYPE),
    destanation: {
      name: 'Chamonix',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Lorem ipsum dolor sit amet,'
        }
      ]
    },
    dateFrom: '2023-05-06T14:30:00',
    dateTo: '2023-05-06T16:05:00',
    isFavorite: false,
    price: 160,
    offers: [
      {
        title: 'Rent a car',
        price: 200,
      }
    ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(POINT_TYPE),
    destanation: {
      name: 'Chamonix',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Lorem ipsum dolor sit amet,'
        }
      ]
    },
    dateFrom: '2023-05-01T16:20:00',
    dateTo: '2023-05-01T17:00:00',
    isFavorite: true,
    price: 600,
    offers: [
      {
        title: 'Add breakfast',
        price: 50,
      }
    ],
  },
  {
    id: nanoid(),
    type: getRandomArrayElement(POINT_TYPE),
    destanation: {
      name: 'Chamonix',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Lorem ipsum dolor sit amet,'
        }
      ]
    },
    dateFrom: '2023-05-07T13:00:00',
    dateTo: '2023-05-07T14:20:00',
    isFavorite: false,
    price: 50,
    offers: [
      {
        title: 'Book tickets',
        price: 40,
      },
      {
        title: 'Lunch in city',
        price: 30,
      }
    ],
  }
];

const getRandomPoints = () => getRandomArrayElement(mockPoints);

export { getRandomPoints, mockPoints };
