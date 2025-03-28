import { createElement } from '../framework/render.js';

const createTaskTemplate = (task) => (
  `<li class="task-item" data-id="${task.id}">${task.title}</li>`
);

export default class TaskComponent {
  constructor(task) {
    this.task = task;
  }

  getTemplate() {
    return createTaskTemplate(this.task);
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
