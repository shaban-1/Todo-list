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

	constructor(title, categoryClass, onTaskDrop) {
		super();
		this.#title = title;
		this.#categoryClass = categoryClass;
		this.#setDropHandler(onTaskDrop);
	}

	get template() {
		return createTasksListTemplate(this.#title, this.#categoryClass);
	}

	#setDropHandler(onTaskDrop) {
		const container = this.element;

		container.addEventListener('dragover', (event) => {
			event.preventDefault();
		});

		container.addEventListener('drop', (event) => {
			event.preventDefault();
			const taskId = event.dataTransfer.getData('text/plain');

			const items = Array.from(container.querySelectorAll('.task-item'));
			let insertIndex = items.length;

			for (let i = 0; i < items.length; i++) {
				const box = items[i].getBoundingClientRect();
				
				if (event.clientY < box.top + box.height / 2) {
					insertIndex = i;
					break;
				}
			}

			onTaskDrop(taskId, this.#categoryClass, insertIndex);
		});
	}
}