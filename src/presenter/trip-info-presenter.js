import { render, replace, remove } from '../framework/render.js';
import { RenderPosition } from '../framework/render.js';
import TripInfoView from '../components/trip-info/trip-info-view.js';
const MAX_POINT_TITLE_COUNT = 3;
export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  #pointModel = null;

  constructor({ tripInfoContainer, pointModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get totalPrice() {
    const points = this.#pointModel.points;
    if (!points.length) {
      return 0;
    }
    // eslint-disable-next-line no-return-assign
    return points.reduce((totalPrice, { price, offers }) => totalPrice += price + this.#getTotalOffersPrice(offers), 0);
  }

  get tripTitle() {
    const points = this.#pointModel.points;
    if (!points.length) {
      return '';
    }
    if (points.length > MAX_POINT_TITLE_COUNT) {
      const startPoint = points[0];
      const endPoint = points[ points.length - 1 ];
      return `${ startPoint.destination.name } &mdash; ... &mdash; ${ endPoint.destination.name }`;
    } else {
      return points.map((point) => point.destination.name).join(' &mdash; ');
    }
  }

  get tripDuration() {
    const points = this.#pointModel.points;
    if (!points.length) {
      return {};
    }

    if (points.length === 1) {
      const { dateFrom, dateTo } = points[0];
      return { dateFrom, dateTo };
    } else {
      const { dateFrom } = points[0];
      const { dateTo } = points[ points.length - 1 ];
      return { dateFrom, dateTo };
    }
  }

  init() {
    const totalPrice = this.totalPrice;
    const tripTitle = this.tripTitle;
    const tripDuration = this.tripDuration;
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      totalPrice,
      tripTitle,
      tripDuration
    });

    if (!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #getTotalOffersPrice(offers) {
    // eslint-disable-next-line no-return-assign
    return offers ? offers.reduce((totalOfferPrice, { price }) => totalOfferPrice += price, 0) : 0;
  }

  #handleModelEvent = () => {
    this.init();
  };
}
