import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearTrashButtonComponent from '../view/task-button-component.js';
import TaskModel from '../model/task-model.js';
import { render, RenderPosition } from '../framework/render.js';
import { STATUS_NAMES, STATUS_LABEL } from '../const.js';
import EmptyTasksComponent from '../view/empty-tasks-component.js';

export default class TasksBoardPresenter {
	#boardComponent;
	#taskModel;
	#taskLists = {};

	constructor({ boardComponent, taskModel }) {
		this.#boardComponent = boardComponent;
		this.#taskModel = taskModel;
	}

	init() {
		this.#renderBoard();
	}
	
	#renderBoard(){
		this.#boardComponent.element.innerHTML = '';
		Object.values(STATUS_NAMES).forEach(status => this.#renderTasksList(status));
	}

	#renderTasksList(status) {
		const statusTitle = STATUS_LABEL[status];
		const tasksListComponent = new TasksListComponent(statusTitle, status);
		render(tasksListComponent, this.#boardComponent.element);
		this.#taskLists[status] = tasksListComponent;

		const tasks = this.#taskModel.tasks.filter((task) => task.status === status);

		if (tasks.length === 0) {
			this.#renderEmptyTask(tasksListComponent);
		} else {
			tasks.forEach((task) => this.#renderTask(task, tasksListComponent));
			if (status === STATUS_NAMES.DISCARDED) {
				this.#renderTrashButton(tasksListComponent);
			}
		}
	}

	#renderTask(task, container) {
		render(new TaskComponent(task), container.element, RenderPosition.BEFOREEND);
	}

	#renderEmptyTask(container) {
		render(new EmptyTasksComponent(), container.element, RenderPosition.BEFOREEND);
	}

	#renderTrashButton(container) {
		render(new ClearTrashButtonComponent(), container.element, RenderPosition.BEFOREEND);
	}
}
