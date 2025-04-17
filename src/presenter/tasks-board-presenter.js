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
		this.#taskModel.addObserver(this.#handleModelChange.bind(this));
	}

	#handleModelChange() {
		this.#clearBoard();
		this.#renderBoard();
	}

	#clearBoard(){
		this.#boardComponent.element.innerHTML = '';
	}

	init() {
		this.#clearBoard();
		this.#renderBoard();
	}
	
	#renderBoard(){
		Object.values(STATUS_NAMES).forEach(status => this.#renderTasksList(status));
	}

	#renderTasksList(status) {
		const statusTitle = STATUS_LABEL[status];
		const tasksListComponent = new TasksListComponent(statusTitle, status);
		render(tasksListComponent, this.#boardComponent.element);
		this.#taskLists[status] = tasksListComponent;

		const tasks = this.#taskModel.getTasksByStatus(status);

		if (tasks.length === 0) {
			this.#renderEmptyTask(tasksListComponent);
		} else {
			tasks.forEach((task) => this.#renderTask(task, tasksListComponent));
			if (status === STATUS_NAMES.DISCARDED) {
				this.#renderTrashButton(tasksListComponent);
			}
		}
	}

	createTask() {
		const taskTitle = document.querySelector('#add-task').value.trim();
		if (!taskTitle){
			return
		}
		this.#taskModel.addTask(taskTitle);

		document.querySelector('#add-task').value = '';
	}

	#renderTask(task, container) {
		render(new TaskComponent(task), container.element, RenderPosition.BEFOREEND);
	}

	#renderTrashButton(container) {
		render(new ClearTrashButtonComponent({onClick: () => this.#handleClearTrash()}), container.element, RenderPosition.BEFOREEND);
	}
	
	#handleClearTrash() {
		const trashTasks = this.#taskModel.tasks.filter(task => task.status === STATUS_NAMES.DISCARDED);
		trashTasks.forEach(task => this.#taskModel.removeTask(task.id));
	}

	#renderEmptyTask(container) {
		render(new EmptyTasksComponent(), container.element, RenderPosition.BEFOREEND);
	}
}
