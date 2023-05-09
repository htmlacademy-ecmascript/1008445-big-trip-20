import { mockPoints } from '../mock/points';

export default class PointModel {
  #points = mockPoints;

  get points() {
    return this.#points;
  }
}
