import Observable from '../framework/observable.js';
import PointAdapter from '../adapter/point-adapter.js';
import { UpdateType } from '../const.js';
import Swal from 'sweetalert2';

export default class PointModel extends Observable {
  #points = [];
  #destinations = [];
  #allOffers = [];
  #pointApiService = null;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get allOffers() {
    return this.#allOffers;
  }

  constructor({ pointApiService }) {
    super();
    this.#pointApiService = pointApiService;
  }

  async init() {
    try {
      const points = await this.#pointApiService.points;
      this.#destinations = await this.#pointApiService.destinations;
      this.#allOffers = await this.#pointApiService.allOffers;
      this.#points = points.map((point) => PointAdapter.adaptToClient(point, this.destinations, this.allOffers));
      this._notify(UpdateType.INIT);
    } catch (error) {
      this.#points = [];
      this.#destinations = [];
      this.#allOffers = [];
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, server is not response! Try to refresh page later',
        confirmButtonColor: '#078ff0',
      });
      this._notify(UpdateType.NOT_RESPONSE);
    }
  }

  async updatedPoint(updateType, update) {
    const index = this.#findPointById(update);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatedPoint = PointAdapter.adaptToClient(response, this.destinations, this.allOffers);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatedPoint);
    } catch (error) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointApiService.addPoint(update);
      const newPoint = PointAdapter.adaptToClient(response, this.destinations, this.allOffers);
      this.#points = [
        newPoint,
        ...this.#points
      ];

      this._notify(updateType, newPoint);
    } catch (error) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#findPointById(update);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointApiService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType);
    } catch (error) {
      throw new Error('Can\'t delete point');
    }
  }

  #findPointById(point) {
    return this.#points.findIndex((p) => p.id === point.id);
  }
}
