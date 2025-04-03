import { createElement } from '../framework/render.js';

function createClearButtonTemplate() {
    return (
        `<button class="clear-btn" id="clearTasksBtn">x Очистить</button>`
    );
}

export default class ClearTrashButtonComponent {
    constructor(onClear) {
        this.onClear = onClear;
    }

    getTemplate() {
        return createClearButtonTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            if (this.onClear) {
                this.element.addEventListener('click', this.onClear);
            }
        }
        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}
