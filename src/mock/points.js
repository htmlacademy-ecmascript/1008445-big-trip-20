import { POINT_TYPE } from '../const';
import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
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
    dateFrom: '2023-03-18T10:30:00',
    dateTo: '2023-03-18T11:00:00',
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
    dateFrom: '2023-03-18T12:25:00',
    dateTo: '2023-03-18T13:35:00',
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
    dateFrom: '2023-03-18T14:30:00',
    dateTo: '2023-03-18T16:05:00',
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
    dateFrom: '2023-03-18T16:20:00',
    dateTo: '2023-03-18T17:00:00',
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
    dateFrom: '2023-03-19T13:00:00',
    dateTo: '2023-03-19T14:20:00',
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

export { getRandomPoints };
