import dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

const humanizePointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';
const humanizePointTime = (date) => date ? dayjs(date).format(TIME_FORMAT) : '';
const humanizePointDateAndTime = (datetime) => datetime ? dayjs(datetime).format(DATE_TIME_FORMAT) : '';
const capitalizeFirstLetter = (str) => str.at(0).toUpperCase() + str.slice(1);
const isPastPoint = (date) => date && dayjs().isAfter(date, 'D');
const isFuturePoint = (date) => date && dayjs().isBefore(date, 'D');
const isPresentPoint = (date) => date && dayjs().isSame(date, 'D');

export {
  humanizePointDate,
  humanizePointTime,
  humanizePointDateAndTime,
  capitalizeFirstLetter,
  isFuturePoint,
  isPastPoint,
  isPresentPoint
};
