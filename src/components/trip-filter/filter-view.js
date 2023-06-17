import { createFilterTemplate } from './filter-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('click', this.#filterTypeChangeHadler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHadler = (evt) => {
    if (evt.target.matches('.trip-filters__filter-input')) {
      this.#handleFilterTypeChange(evt.target.value);
    }
  };
}
