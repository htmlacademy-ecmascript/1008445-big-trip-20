import { render, remove } from '../framework/render.js';
import PointListView from '../components/point-list/point-list-view.js';
import SortView from '../components/sort/sort-view.js';
import NoPointView from '../components/no-point/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortByDay, sortByDurationTime, sortByPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';

export default class TripPresenter {
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #pointPresenters = new Map();
  #newPointPresenter = null;

  #pointModel = null;
  #filterModel = null;

  #tripBodyContainer = null;
  #sortComponent = null;
  #pointListComponent = null;
  #noPointComponent = null;

  constructor({ tripBodyContainer, pointModel, filterModel, onNewPointDestroy }) {
    this.#tripBodyContainer = tripBodyContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredTasks = filter[this.#filterType](points);
    switch(this.#currentSortType) {
      case SortType.DURATION_TIME:
        return filteredTasks.sort(sortByDurationTime);
      case SortType.PRICE:
        return filteredTasks.sort(sortByPrice);
    }

    return filteredTasks.sort(sortByDay);
  }

  init() {
    this.#renderTrip();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatedPoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip();
        this.#renderTrip({ resetSortType: true });
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  createTask() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderTrip() {
    this.#renderSort();
    if (!this.points.length) {
      this.#renderNoPoint();
      return;
    }
    this.#renderPointList();
    this.#renderPoints();
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#tripBodyContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripBodyContainer);
  }

  #renderPointList() {
    this.#pointListComponent = new PointListView();
    render(this.#pointListComponent, this.#tripBodyContainer);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearTrip({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }
}
