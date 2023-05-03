/* eslint-disable no-unused-vars */
import BoardPresenter from './presenter/board-presenter';
import { render, RenderPosition } from './render';
import FilterView from './components/trip-filter/trip-filter-view';
import TripInfoView from './components/trip-info/trip-info-view';
import PointModel from './models/point-model';

const mainElement = document.querySelector('.page-main');
const headerElement = document.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');
const eventListElement = mainElement.querySelector('.trip-events');
const pointModel = new PointModel();

const boardPresenter = new BoardPresenter({
  container: eventListElement,
  pointModel
});

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
