import { SortType } from '../../const.js';
import { capitalizeFirstLetter } from '../../utils/point.js';

const DEFAULT_SORT_TYPE = SortType.DAY;
const DISABLE_SORT_TYPES = [ SortType.EVENT, SortType.OFFERS ];
const createSortItemTemplate = (sortType) => `<div class="trip-sort__item  trip-sort__item--${ sortType }">
    <input 
      id="sort-${ sortType }" 
      class="trip-sort__input  visually-hidden" 
      type="radio" 
      name="trip-sort" 
      value="sort-${ sortType }" 
      data-sort-type="${ sortType }" ${ sortType === DEFAULT_SORT_TYPE ? 'checked' : '' } 
      ${ DISABLE_SORT_TYPES.includes(sortType) ? 'disabled' : ''}
    >
    <label class="trip-sort__btn" for="sort-${ sortType }">${ capitalizeFirstLetter(sortType) }</label>
  </div>`;


function createSortTemplate() {
  const sortItems = Object.values(SortType).map((sortItem) => createSortItemTemplate(sortItem)).join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${ sortItems }
  </form>`;
}

export { createSortTemplate };
