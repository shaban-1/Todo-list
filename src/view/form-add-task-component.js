import { createElement } from '../framework/render.js';

function createFormAddTaskTemplate() {
  return (
    `<section class="form-section">
       <form class="task-form">
         <h2 class="form-title">Новая задача</h2>
         <input class="task-input" placeholder="Название задачи..." type="text">
         <button class="add-task-btn" id="addTaskBtn">+ Добавить</button>
       </form>
     </section>`
  );
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskTemplate();
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
