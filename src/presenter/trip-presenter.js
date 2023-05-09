import { render } from '../framework/render.js';
import PointListView from '../components/point-list/point-list-view.js';
import SortView from '../components/sort/sort-view.js';
import NoPointView from '../components/no-point/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';
import { SortType } from '../const.js';
import { sortByDay, sortByDurationTime, sortByPrice } from '../utils/point.js';

export default class TripPresenter {
  #tripBodyContainer = null;
  #sortComponent = null;
  #pointModel = null;
  #pointPresenters = new Map();

  #points = [];
  #currentSortType = SortType.DAY;

  #pointListComponent = new PointListView();
  #noPointComponent = new NoPointView();

  constructor({ tripBodyContainer, pointModel }) {
    this.#tripBodyContainer = tripBodyContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [ ...this.#pointModel.points ];
    this.#points.sort(sortByDay);
    this.#renderTrip();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #renderTrip() {
    if (!this.#points.length) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripBodyContainer);
  }

  #renderPoints() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderNoPoint() {
    if (!this.#points.length) {
      render(this.#noPointComponent, this.#tripBodyContainer);
    }
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#tripBodyContainer);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.DURATION_TIME:
        this.#points.sort(sortByDurationTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default: this.#points.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }
}
