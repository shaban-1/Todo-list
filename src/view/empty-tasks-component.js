import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyTasksTemplate() {
	return(
		`<li class="task-item empty-task"> Нет задач </li>`
	);
}

export default class EmptyTasksComponent extends AbstractComponent {
	get template() {
		return createEmptyTasksTemplate();
	}
}