import { SortType } from '../../const.js';

const DISABLE_SORT_TYPES = [ SortType.EVENT, SortType.OFFERS ];
const createSortItemTemplate = (sortType, isChecked) => `<div class="trip-sort__item  trip-sort__item--${ sortType }">
    <input 
      id="sort-${ sortType }" 
      class="trip-sort__input  visually-hidden" 
      type="radio" 
      name="trip-sort" 
      value="sort-${ sortType }" 
      data-sort-type="${ sortType }" ${ isChecked ? 'checked' : '' } 
      ${ DISABLE_SORT_TYPES.includes(sortType) ? 'disabled' : ''}
    >
    <label class="trip-sort__btn" for="sort-${ sortType }">${ sortType }</label>
  </div>`;
const createSortTemplate = (currentSortType) => {
  const sortItems = Object.values(SortType).map((sortItem) => createSortItemTemplate(sortItem, sortItem === currentSortType)).join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${ sortItems }
  </form>`;
};

export { createSortTemplate };
