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
const getDatesDiff = (dateFrom, dateTo, timeUnit) => timeUnit ? dayjs(dateTo).diff(dayjs(dateFrom), timeUnit) : dayjs(dateTo).diff(dayjs(dateFrom));
const getDuration = (dateFrom, dateTo) => {
  const minutes = getDatesDiff(dateFrom, dateTo, 'minute');
  const hourDuration = parseInt(minutes / 60, 10);
  const minuteDuration = dayjs().minute(minutes).$m;
  return { hourDuration, minuteDuration };
};
const sortByDay = (pointA, pointB) => {
  const dateA = dayjs(pointA.dateFrom);
  const dateB = dayjs(pointB.dateFrom);
  if (dateA.isSame(dateB, 'D')) {
    return 0;
  }
  return dateA.isAfter(dateB, 'D') ? 1 : -1;
};
const sortByDurationTime = (pointA, pointB) => getDatesDiff(pointB.dateFrom, pointB.dateTo) - getDatesDiff(pointA.dateFrom, pointA.dateTo);
const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

export {
  humanizePointDate,
  humanizePointTime,
  humanizePointDateAndTime,
  capitalizeFirstLetter,
  isFuturePoint,
  isPastPoint,
  isPresentPoint,
  getDuration,
  sortByDay,
  sortByDurationTime,
  sortByPrice,
};
