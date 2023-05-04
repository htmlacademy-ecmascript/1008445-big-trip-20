import { createNoPointTemplate } from './no-point-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class NoPointView extends AbstractView{
  get template() {
    return createNoPointTemplate();
  }
}
