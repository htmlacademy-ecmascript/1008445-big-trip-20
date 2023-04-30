import { createElement } from '../../render.js';
import { createEditEventTemplate } from './event-edit-template.js';

export default class EditEventView {
  getTemplate() {
    return createEditEventTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
