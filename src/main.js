import { render, RenderPosition } from './framework/render.js';
import TripInfoView from './components/trip-info/trip-info-view.js';
import PointModel from './models/point-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './models/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import newPointButtonView from './components/add-point-button/new-point-button-view.js';
import PointApiService from './point-api-service.js';

const AUTORIZATION = 'Basic gS2sfV54wcl2sd2j';
const END_POINT = 'https://20.objects.pages.academy/big-trip';
const pageBodyElement = document.querySelector('.page-main .page-body__container');
const headerElement = document.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');

const pointModel = new PointModel({
  pointApiService: new PointApiService(END_POINT, AUTORIZATION)
});
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({
  tripBodyContainer: pageBodyElement,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  pointModel,
  filterModel
});
const newPointButtonComponent = new newPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}
render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);

pointModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripInfoElement, RenderPosition.BEFOREEND);
  });
tripPresenter.init();
filterPresenter.init();
