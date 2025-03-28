import { createElement } from '../framework/render.js';

const createTasksListTemplate = (title, categoryClass) => (
  `<ul class="task-category ${categoryClass}">
      <h3 class="category-title">${title}</h3>
   </ul>`
);

export default class TasksListComponent {
  constructor(title, categoryClass) {
    this.title = title;
    this.categoryClass = categoryClass;
  }

  getTemplate() {
    return createTasksListTemplate(this.title, this.categoryClass);
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
