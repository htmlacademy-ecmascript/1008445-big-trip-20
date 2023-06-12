import PointModel from './models/point-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './models/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointApiService from './api-service/point-api-service.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const AUTORIZATION = 'Basic gS2sfV54wcl2sd2j';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const pageBodyElement = document.querySelector('.page-main .page-body__container');
const tripInfoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel({ pointApiService: new PointApiService(END_POINT, AUTORIZATION) });
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripBodyContainer: pageBodyElement,
  tripInfoContainer: tripInfoElement,
  pointModel,
  filterModel
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  pointModel,
  filterModel
});
const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: tripInfoElement,
  pointModel
});

pointModel.init();
tripPresenter.init();
filterPresenter.init();
tripInfoPresenter.init();
