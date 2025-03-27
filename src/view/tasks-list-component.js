import { createElement } from '../framework/render.js';

/**
 * @param {string} title - заголовок колонки (Бэклог, В процессе и т.д.)
 * @param {string} categoryClass - класс для колонки (например 'pending', 'in-progress' и т.д.)
 * @param {boolean} hasClearButton - нужен ли блок с кнопкой очистки
 */
function createTasksListTemplate(title, categoryClass, hasClearButton = false) {
  return (
    `<ul class="task-category ${categoryClass}">
       <h3 class="category-title">${title}</h3>
       ${hasClearButton
          ? `<button class="clear-btn" id="clearTasksBtn">x Очистить</button>`
          : ''
       }
     </ul>`
  );
}

export default class TasksListComponent {
  constructor(title, categoryClass, hasClearButton = false) {
    this.title = title;
    this.categoryClass = categoryClass;
    this.hasClearButton = hasClearButton;
  }

  getTemplate() {
    return createTasksListTemplate(this.title, this.categoryClass, this.hasClearButton);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      if (this.hasClearButton) {
        const clearButton = this.element.querySelector('.clear-btn');
        this.element.appendChild = (child) => {
          return this.element.insertBefore(child, clearButton);
        };
        const originalInsertAdjacentElement = this.element.insertAdjacentElement.bind(this.element);
        this.element.insertAdjacentElement = (position, element) => {
          if (position === 'beforeend') {
            return this.element.insertBefore(element, clearButton);
          }
          return originalInsertAdjacentElement(position, element);
        };
      }
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
