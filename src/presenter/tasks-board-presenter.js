import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearTrashButtonComponent from '../view/task-list-delete-button-component.js';
import { render, RenderPosition } from '../framework/render.js';
import { STATUS_NAMES, STATUS_LABEL, USER_ACTION, UPDATE_TYPE } from '../const.js';
import EmptyTasksComponent from '../view/empty-tasks-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';


export default class TasksBoardPresenter {
	#boardComponent;
	#taskModel;
	#taskLists = {};
	#resetButtonComponent = null;
	#loadingComponent = new LoadingViewComponent();

	constructor({ boardComponent, taskModel }) {
		this.#boardComponent = boardComponent;
		this.#taskModel = taskModel;
		this.#taskModel.addObserver(this.#handleModelEvent.bind(this));
	}

	#handleModelEvent(updateType, payload) {
		switch (updateType) {
			case UPDATE_TYPE.INIT:
			case USER_ACTION.ADD_TASK:
			case USER_ACTION.UPDATE_TASK:
			case USER_ACTION.DELETE_TASK:
				this.#clearBoard();
				this.#renderBoard();
				this.#renderResetButtonIfNeeded();
				break;
		}
	}

	#clearBoard(){
		this.#boardComponent.element.innerHTML = '';
	}

	async init() {
		render(this.#loadingComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
		await this.#taskModel.init();
		this.#boardComponent.element.innerHTML = '';
		this.#clearBoard();
		this.#renderBoard();
		this.#renderResetButtonIfNeeded();
	  }
	
	#renderBoard(){
		Object.values(STATUS_NAMES).forEach(status => this.#renderTasksList(status));
	}

	#renderTasksList(status) {
		const statusTitle = STATUS_LABEL[status];
		const listComponent = new TasksListComponent(statusTitle, status, this.#handleTaskDrop.bind(this));
		render(listComponent, this.#boardComponent.element);
		this.#taskLists[status] = listComponent;

		const tasks = this.#taskModel.getTasksByStatus(status);
		if (!tasks.length) {
			render(new EmptyTasksComponent(), listComponent.element, RenderPosition.BEFOREEND);
		} else {
			tasks.forEach(task => this.#renderTask(task, listComponent));
			if (status === STATUS_NAMES.DISCARDED) {
				this.#resetButtonComponent = new ClearTrashButtonComponent({ onClick: this.#handleClearTrash.bind(this) });
				render(this.#resetButtonComponent, listComponent.element, RenderPosition.BEFOREEND);
			}
		}
	}

	#renderTask(task, container) {
		render(new TaskComponent(task), container.element, RenderPosition.BEFOREEND);
	}

	async #handleTaskDrop(taskId, newStatus, newIndex) {
		try {
			await this.#taskModel.updateTaskStatus(taskId, newStatus, newIndex);
		} catch (err) {
			console.error('Ошибка при обновлении статуса задачи', err);
		}
	}

	createTask() {
		const input = document.querySelector('#add-task');
		const title = input.value.trim();
		if (!title) {
			return;
		}
		this.#taskModel.addTask(title);
		input.value = '';
	}

	async #handleClearTrash() {
		try {
			await this.#taskModel.clearDiscardedTasks();
		} catch (err) {
			console.error('Ошибка при очистке корзины:', err);
		}
	}

	#renderResetButtonIfNeeded() {
		if (this.#resetButtonComponent) {
			this.#resetButtonComponent.toggleDisabled(!this.#taskModel.hasDiscardedTasks());
		}
	}
}
