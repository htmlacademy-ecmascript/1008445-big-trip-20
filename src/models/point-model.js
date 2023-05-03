import { getRandomPoints } from '../mock/points';
import { POINT_COUNT } from '../const';

export default class PointModel {
  points = Array.from({ length: POINT_COUNT }, getRandomPoints);

  getPoints() {
    return this.points;
  }
}

