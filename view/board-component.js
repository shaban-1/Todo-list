import { createElement } from '../framework/render.js';

function createBoardTemplate() {
  return (
    `<section class="tasks-section"></section>`
  );
}

export default class BoardComponent {
  getTemplate() {
    return createBoardTemplate();
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
