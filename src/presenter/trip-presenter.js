import { render, replace } from '../framework/render.js';
import EditPointView from '../components/point-edit/point-edit-view.js';
import PointListView from '../components/point-list/point-list-view.js';
import PointView from '../components/point/point-view.js';
import SortView from '../components/sort/sort-view.js';
import NoPointView from '../components/no-point/no-point-view.js';

export default class TripPresenter {
  #tripBodyContainer = null;
  #pointModel = null;
  #points = [];

  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  constructor({ tripBodyContainer, pointModel }) {
    this.#tripBodyContainer = tripBodyContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [ ...this.#pointModel.points ];
    this.#renderTrip();
  }

  #renderTrip() {
    if (!this.#points.length) {
      render(this.#noPointComponent, this.#tripBodyContainer);
      return;
    }

    render(this.#sortComponent, this.#tripBodyContainer);
    render(this.#pointListComponent, this.#tripBodyContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
