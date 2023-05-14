import Observable from '../framework/observable.js';
import PointAdapter from '../adapter/point-adapter.js';
import { UpdateType } from '../const.js';

export default class PointModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #pointApiService = null;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  constructor({ pointApiService }) {
    super();
    this.#pointApiService = pointApiService;
  }

  async init() {
    try {
      const points = await this.#pointApiService.points;
      this.#destinations = await this.#pointApiService.destinations;
      this.#offers = await this.#pointApiService.offers;
      this.#points = points.map((point) => PointAdapter.adaptToClient(point, this.#destinations, this.#offers));
    } catch (error) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatedPoint(updateType, update) {
    const index = this.#findPointById(update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatedPoint = PointAdapter.adaptToClient(response, this.#destinations, this.#offers);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, update);
    } catch (error) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#findPointById(update);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #findPointById(point) {
    return this.#points.findIndex((p) => p.id === point.id);
  }
}
