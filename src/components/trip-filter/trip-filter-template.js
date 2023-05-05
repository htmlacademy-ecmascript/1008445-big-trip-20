function createFilterItemTemplate(filter, isChecked) {
  const { type } = filter;
  return /*html*/`<div class="trip-filters__filter">
    <input 
      id="filter-${ type }"
      class="trip-filters__filter-input
      visually-hidden"
      type="radio"
      name="trip-filter"
      value="everything"
      ${ isChecked ? 'cheked' : '' }
    >
    <label class="trip-filters__filter-label" for="filter-${ type }">${ type.toUpperCase() }</label>
    </div>`;
}

function createFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return /*html*/`<form class="trip-filters" action="#" method="get">
      ${ filterItemsTemplate }
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export { createFilterTemplate };
