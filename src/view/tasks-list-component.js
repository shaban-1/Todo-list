import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksListTemplate(title, categoryClass) {
	return (
		`<ul class="task-category ${categoryClass}">
			<h3 class="category-title">${title}</h3>
		</ul>`
	);
}

export default class TasksListComponent extends AbstractComponent {
	#title;
	#categoryClass;

	constructor(title, categoryClass) {
		super();
		this.#title = title;
		this.#categoryClass = categoryClass;
	}

	get template() {
		return createTasksListTemplate(this.#title, this.#categoryClass);
	}
}