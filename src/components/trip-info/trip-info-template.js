import { humanizePointDate } from '../../utils/point';
import dayjs from 'dayjs';

const createTripInfoTemplate = (totalPrice, destinationTitle, { dateFrom, dateTo }) => {
  let tripDurationTitle = '';
  if (dateFrom && dateTo) {
    const startDate = dayjs(dateFrom), endDate = dayjs(dateTo);
    const isMonthEqual = startDate.month() === endDate.month();
    tripDurationTitle = isMonthEqual
      ? `${ humanizePointDate(dateFrom) } &mdash; ${ endDate.date() }`
      : `${ humanizePointDate(dateFrom) } &mdash; ${ humanizePointDate(dateTo) }`;
  }
  return /*html*/`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${ destinationTitle }</h1>

    <p class="trip-info__dates">${ tripDurationTitle }</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${ totalPrice }</span>
  </p>
</section>`;
};

export { createTripInfoTemplate };
