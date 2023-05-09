const POINT_COUNT = 5;
const POINT_TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  DURATION_TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export { POINT_COUNT, POINT_TYPE, FilterType, SortType };
