import { EVENT_COUNT } from '../../const.js';
import { render } from '../../render.js';
import EditEventView from '../event-edit/event-edit-view.js';
import EventListView from '../event-list/event-list-view.js';
import EventView from '../event/event-view.js';
import SortView from '../sort/sort-view.js';

export default class BoardPresenter {
  eventListComponent = new EventListView();
  sortComponent = new SortView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    render(new EditEventView(), this.eventListComponent.getElement());

    for (let i = 0; i < EVENT_COUNT; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
