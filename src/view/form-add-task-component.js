import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskTemplate() {
	return (
		`<section class="form-section">
			<form class="task-form">
				<h2 class="form-title">Новая задача</h2>
				<input class="task-input" placeholder="Название задачи..." type="text">
				<button class="add-task-btn" id="addTaskBtn">+ Добавить</button>
			</form>
		</section>`
	);
}

export default class FormAddTaskComponent extends AbstractComponent {
	get template() {
		return createFormAddTaskTemplate();
	}
}