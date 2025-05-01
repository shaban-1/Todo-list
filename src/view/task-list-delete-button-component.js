import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearButtonTemplate() {
	return (
		`<button class="clear-btn" type="clear" id="clearTasksBtn">x Очистить</button>`
	);
}

export default class ClearTrashButtonComponent extends AbstractComponent {
	#onClear;

	constructor({ onClick }) {
		super();
		this.#onClear = onClick;
		this.element.addEventListener('click', this.#clickHandler);
	}
		
	toggleDisabled(isDisabled) {
		this.element.disabled = isDisabled;
	}

	get template() {
		return createClearButtonTemplate();
	}

	#clickHandler = (evt) => {
		evt.preventDefault();
		this.#onClear();
	}
}