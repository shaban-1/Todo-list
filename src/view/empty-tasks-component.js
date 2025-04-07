import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyTasksTemplate() {
	return(
		`<li class="task-item empty-task"> Перетащите карточку </li>`
	);
}

export default class EmptyTasksComponent extends AbstractComponent {
	get template() {
		return createEmptyTasksTemplate();
	}
}