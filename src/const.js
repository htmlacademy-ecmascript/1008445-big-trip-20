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
  DEFAULT: 'day',
  EVENT: 'event',
  DURATION_TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};
const UserAction = {
  UPDATE_POINT: 'update',
  ADD_POINT: 'add_point',
  DELETE_POINT: 'delete_point'
};
const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

export { POINT_COUNT, POINT_TYPE, FilterType, SortType, UserAction, UpdateType };
