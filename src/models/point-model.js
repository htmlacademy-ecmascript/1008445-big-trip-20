import { mockPoints } from '../mock/points.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #points = mockPoints;

  get points() {
    return this.#points;
  }

  updatedPoint(updateType, update) {
    const index = this.#findPointById(update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
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
