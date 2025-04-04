import { AbstractComponent } from "../framework/view/abstract-component.js";

function createBoardTemplate() {
	return (
		`<section class="tasks-section"></section>`
	);
}

export default class BoardComponent extends AbstractComponent {
	get template() {
		return createBoardTemplate();
	}
}