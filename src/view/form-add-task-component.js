import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskTemplate() {
	return (
		`<section class="form-section">
			<form class="task-form">
				<h2 class="form-title">Новая задача</h2>
				<input class="task-input" placeholder="Название задачи..." id="add-task" type="text">
				<button class="add-task-btn" id="addTaskBtn" type="submit">+ Добавить</button>
			</form>
		</section>`
	);
}

export default class FormAddTaskComponent extends AbstractComponent {
	#handleClick = null;

	constructor({ onClick }) {
		super();
		this.#handleClick = onClick;
		this.element.addEventListener('submit', this.#clickHandler);
	}

	get template() {
		return createFormAddTaskTemplate();
	}

	#clickHandler = (evt) => {
		evt.preventDefault();
		this.#handleClick();
	};
}