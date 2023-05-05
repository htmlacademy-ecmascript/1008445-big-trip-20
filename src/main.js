import { render, RenderPosition } from './framework/render.js';
import FilterView from './components/trip-filter/trip-filter-view.js';
import TripInfoView from './components/trip-info/trip-info-view.js';
import PointModel from './models/point-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import { generateFilter } from './mock/filter.js';

const pageBodyElement = document.querySelector('.page-main .page-body__container');
const headerElement = document.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
const tripPresenter = new TripPresenter({
  tripBodyContainer: pageBodyElement,
  pointModel
});
const filters = generateFilter(pointModel.points);

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView({ filters }), filterElement, RenderPosition.AFTERBEGIN);

tripPresenter.init();
