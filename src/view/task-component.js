import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskTemplate(task) {
	return(
		`<li class="task-item" data-id="${task.id}">${task.title}</li>`
	);
}

export default class TaskComponent extends AbstractComponent {
	#task;

	constructor(task) {
		super();
		this.#task = task;
	}

	get template() {
		return createTaskTemplate(this.#task);
	}
}