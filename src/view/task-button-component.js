import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearButtonTemplate() {
	return (
		`<button class="clear-btn" id="clearTasksBtn">x Очистить</button>`
	);
}

export default class ClearTrashButtonComponent extends AbstractComponent {
	#onClear;

	constructor(onClear) {
		super();
		this.#onClear = onClear;
	}

	get template() {
		return createClearButtonTemplate();
	}
}