import { POINT_TYPE } from '../../const.js';
import { capitalizeFirstLetter } from '../../utils/point.js';

const createPointTypeItemTemplate = (type) => `<div class="event__type-item">
  <input id="event-type-${ type }-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${ type }">
  <label class="event__type-label  event__type-label--${ type }" for="event-type-${ type }-1">${ capitalizeFirstLetter(type) }</label>
  </div>`;
const createPointTypeListTemplate = () => POINT_TYPE.map((type) => createPointTypeItemTemplate(type)).join('');

export { createPointTypeListTemplate };
