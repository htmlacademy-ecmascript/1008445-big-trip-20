import { POINT_TYPE } from '../const.js';
import { getRandomArrayElement } from '../utils/utils.js';
import { nanoid } from 'nanoid';

const mockDestanations = [
  {
    id: nanoid(),
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, Amsterdam. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Amsterdam Lorem ipsum dolor sit amet,'
      }
    ]
  },
  {
    id: nanoid(),
    name: 'Chamonix',
    description: 'Lorem ipsum Chamonix.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Chamonix Lorem ipsum dolor sit amet,'
      },
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Chamonix Lorem ipsum dolor sit amet,'
      }
    ]
  },
  {
    id: nanoid(),
    name: 'Geneva',
    description: 'Geneva Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=4',
        description: 'Geneva Lorem ipsum dolor sit amet,'
      },
      {
        src: 'https://loremflickr.com/248/152?random=5',
        description: 'Geneva Lorem ipsum dolor sit amet,'
      }
    ]
  }
];
const mockOffers = [
  {
    type: POINT_TYPE[0],
    offers: [
      {
        id: nanoid(),
        title: 'Order Uber',
        price: 20,
      }
    ]
  },
  {
    type: POINT_TYPE[1],
    offers: [
      {
        id: nanoid(),
        title: 'Add luggage',
        price: 50,
      },
      {
        id: nanoid(),
        title: 'Add meal',
        price: 15,
      }
    ]
  },
  {
    type: POINT_TYPE[2],
    offers: [
      {
        id: nanoid(),
        title: 'Book tickets',
        price: 40,
      },
      {
        id: nanoid(),
        title: 'Lunch in city',
        price: 30,
      }
    ]
  },
  {
    type: POINT_TYPE[3],
    offers: [
      {
        id: nanoid(),
        title: 'Add breakfast',
        price: 50,
      }
    ]
  },
  {
    type: POINT_TYPE[4],
    offers: [
      {
        id: nanoid(),
        title: 'Add breakfast',
        price: 50,
      }
    ]
  },
  {
    type: POINT_TYPE[5],
    offers: [
      {
        id: nanoid(),
        title: 'Add breakfast',
        price: 50,
      },
      {
        id: nanoid(),
        title: 'Book tickets',
        price: 40,
      },
    ]
  },
  {
    type: POINT_TYPE[6],
    offers: [
      {
        id: nanoid(),
        title: 'Add breakfast',
        price: 50,
      },
      {
        id: nanoid(),
        title: 'Book tickets',
        price: 40,
      },
    ]
  },
  {
    type: POINT_TYPE[7],
    offers: [
      {
        id: nanoid(),
        title: 'Add luggage',
        price: 50,
      },
      {
        id: nanoid(),
        title: 'Add meal',
        price: 15,
      }
    ]
  },
  {
    type: POINT_TYPE[8],
    offers: [
      {
        id: nanoid(),
        title: 'Add luggage',
        price: 50,
      },
      {
        id: nanoid(),
        title: 'Add meal',
        price: 15,
      }
    ]
  },
];
const mockPoints = [
  {
    id: nanoid(),
    type: POINT_TYPE[7],
    destanation: getRandomArrayElement(mockDestanations),
    dateFrom: '2023-05-05T10:30:00',
    dateTo: '2023-05-05T11:00:00',
    isFavorite: true,
    price: 20,
    offers: mockOffers.find((offer) => offer.type === POINT_TYPE[0]),
  },
  {
    id: nanoid(),
    type: POINT_TYPE[1],
    destanation: getRandomArrayElement(mockDestanations),
    dateFrom: '2023-05-06T12:25:00',
    dateTo: '2023-05-06T13:35:00',
    isFavorite: false,
    price: 160,
    offers: mockOffers.find((offer) => offer.type === POINT_TYPE[0]),
  },
  {
    id: nanoid(),
    type: POINT_TYPE[2],
    destanation: getRandomArrayElement(mockDestanations),
    dateFrom: '2023-05-06T14:30:00',
    dateTo: '2023-05-06T16:05:00',
    isFavorite: false,
    price: 160,
    offers: mockOffers.find((offer) => offer.type === POINT_TYPE[0]),
  },
  {
    id: nanoid(),
    type: POINT_TYPE[3],
    destanation: getRandomArrayElement(mockDestanations),
    dateFrom: '2023-05-01T16:20:00',
    dateTo: '2023-05-01T17:00:00',
    isFavorite: true,
    price: 600,
    offers: mockOffers.find((offer) => offer.type === POINT_TYPE[0]),
  },
  {
    id: nanoid(),
    type: POINT_TYPE[4],
    destanation: getRandomArrayElement(mockDestanations),
    dateFrom: '2023-05-07T13:00:00',
    dateTo: '2023-05-07T14:20:00',
    isFavorite: false,
    price: 50,
    offers: mockOffers.find((offer) => offer.type === POINT_TYPE[0]),
  },
  {
    id: nanoid(),
    type: POINT_TYPE[5],
    destanation: getRandomArrayElement(mockDestanations),
    dateFrom: '2023-05-07T13:00:00',
    dateTo: '2023-05-07T14:20:00',
    isFavorite: false,
    price: 50,
    offers: mockOffers.find((offer) => offer.type === POINT_TYPE[0]),
  },
  {
    id: nanoid(),
    type: POINT_TYPE[6],
    destanation: getRandomArrayElement(mockDestanations),
    dateFrom: '2023-05-07T13:00:00',
    dateTo: '2023-05-07T14:20:00',
    isFavorite: false,
    price: 50,
    offers: mockOffers.find((offer) => offer.type === POINT_TYPE[0]),
  }
];
const getRandomPoints = () => getRandomArrayElement(mockPoints);

export { getRandomPoints, mockPoints, mockDestanations, mockOffers };
