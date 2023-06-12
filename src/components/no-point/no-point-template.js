
import { FilterType } from '../../const.js';

const NoPointTextType = {
  [ FilterType.EVERYTHING ]: 'Click New Event to create your first point',
  [ FilterType.PAST ]: 'There are no past events now',
  [ FilterType.PRESENT ]: 'There are no present events now',
  [ FilterType.FUTURE ]: 'There are no future events now',
};
const createNoPointTemplate = (filterType) => {
  const noPointTextValue = NoPointTextType[ filterType ];
  return `<p class="trip-events__msg">${ noPointTextValue }</p>`;
};

export { createNoPointTemplate };
