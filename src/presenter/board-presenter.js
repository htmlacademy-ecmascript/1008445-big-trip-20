import { render } from '../render.js';
import EditPointView from '../components/point-edit/point-edit-view.js';
import PointListView from '../components/point-list/point-list-view.js';
import PointView from '../components/point/point-view.js';
import SortView from '../components/sort/sort-view.js';

export default class BoardPresenter {
  pointListComponent = new PointListView();
  sortComponent = new SortView();

  constructor({ container, pointModel }) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.pointListComponent, this.container);
    this.points = [ ...this.pointModel.getPoints() ];

    render(new EditPointView(this.points[0]), this.pointListComponent.getElement());
    for (let i = 1; i < this.points.length; i++) {
      render(new PointView({ point: this.points[i] }), this.pointListComponent.getElement());
    }
  }
}
