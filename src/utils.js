import dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const humanizePointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';
const humanizePointTime = (date) => date ? dayjs(date).format(TIME_FORMAT) : '';
const humanizePointDateAndTime = (datetime) => datetime ? dayjs(datetime).format(DATE_TIME_FORMAT) : '';
const capitalizeFirstLetter = (str) => str.at(0).toUpperCase() + str.slice(1);

export {
  getRandomArrayElement,
  humanizePointDate,
  humanizePointTime,
  humanizePointDateAndTime,
  capitalizeFirstLetter
};
