import dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const DEDAUL_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const humanizePointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';
const humanizePointTime = (date) => date ? dayjs(date).format(TIME_FORMAT) : '';
const humanizePointDateAndTime = (datetime) => datetime ? dayjs(datetime).format(DATE_TIME_FORMAT) : '';
const setDefaultPointDateAndTime = (datetime) => datetime ? dayjs(datetime).format(DEDAUL_DATE_TIME_FORMAT) : '';
const capitalizeFirstLetter = (str) => str.at(0).toUpperCase() + str.slice(1);
const isPastPoint = (date) => date && dayjs().isAfter(date, 'D');
const isFuturePoint = (date) => date && dayjs().isBefore(date, 'D');
const isPresentPoint = (date) => date && dayjs().isSame(date, 'D');
const getDatesDiff = (dateFrom, dateTo, timeUnit) => timeUnit ? dayjs(dateTo).diff(dayjs(dateFrom), timeUnit) : dayjs(dateTo).diff(dayjs(dateFrom));
const getDuration = (dateFrom, dateTo) => {
  const minutes = getDatesDiff(dateFrom, dateTo, 'minute');
  let hourDuration = parseInt(minutes / 60, 10);
  const dayDuration = parseInt(hourDuration / 24, 10);
  if (dayDuration) {
    hourDuration = hourDuration - dayDuration * 24;
  }
  const minuteDuration = dayjs().minute(minutes).$m;
  return { dayDuration, hourDuration, minuteDuration };
};
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
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
const findDestinationById = (destinationId, destinations) => destinations.find((destination) => destination.id === destinationId);
const findOfferByType = (type, allOffers) => allOffers.find((offer) => offer.type === type);

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
  setDefaultPointDateAndTime,
  isDatesEqual,
  findDestinationById,
  findOfferByType,
};
