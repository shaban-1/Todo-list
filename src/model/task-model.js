import Observable from '../framework/observable.js';
import { STATUS_NAMES, USER_ACTION, UPDATE_TYPE } from '../const.js';
import { generateID } from '../utils.js';

export default class TaskModel extends Observable {
	#tasksApiService = null;
	#tasks = [];

	constructor({ tasksApiService }) {
		super();
		this.#tasksApiService = tasksApiService;
	}

	get tasks() {
		return this.#tasks;
	}

	async init() {
		try {
			const tasks = await this.#tasksApiService.tasks;
			this.#tasks = tasks;
		} catch (err) {
			this.#tasks = [];
		}
		this._notify(UPDATE_TYPE.INIT);
	}

	async addTask(title) {
		const newTask = {
			id: generateID(),
			title,
			status: STATUS_NAMES.PENDING
		};
		try {
			const createdTask = await this.#tasksApiService.addTask(newTask);
			this.#tasks.push(createdTask);
			this._notify(USER_ACTION.ADD_TASK, createdTask);
			return createdTask;
		} catch (err) {
			throw err;
		}
	}

	async updateTaskStatus(taskId, newStatus, newIndex = null) {
		const id = String(taskId);
		const oldIndex = this.#tasks.findIndex(t => String(t.id) === id);
		if (oldIndex === -1) return;

		const [task] = this.#tasks.splice(oldIndex, 1);
		const previousStatus = task.status;
		task.status = newStatus;

		if (newIndex === null) {
			this.#tasks.push(task);
		} else {
			const statusIndices = this.#tasks
			.map((t, idx) => t.status === newStatus ? idx : -1)
			.filter(idx => idx !== -1);

			let insertIndex;
			if (statusIndices.length === 0 || newIndex >= statusIndices.length) {
				insertIndex = this.#tasks.length;
			} else {
				insertIndex = statusIndices[newIndex];
			}

			this.#tasks.splice(insertIndex, 0, task);
		}

		try {
			const updatedTask = await this.#tasksApiService.updateTask(task);
			Object.assign(task, updatedTask);
			this._notify(USER_ACTION.UPDATE_TASK, task);
		} catch (err) {
			task.status = previousStatus;
			this.#tasks.splice(oldIndex, 0, task);
			throw err;
		}
	}



	getTasksByStatus(status) {
		return this.#tasks.filter(task => task.status === status);
	}

	async clearDiscardedTasks() {
		const discardedTasks = this.#tasks.filter(t => t.status === STATUS_NAMES.DISCARDED);
		if (discardedTasks.length === 0) {
		  return;
		}
		try {
		  await Promise.all(
			discardedTasks.map(t => this.#tasksApiService.deleteTask(String(t.id)))
		  );
		  this.#tasks = this.#tasks.filter(t => t.status !== STATUS_NAMES.DISCARDED);
		  this._notify(USER_ACTION.DELETE_TASK, { status: STATUS_NAMES.DISCARDED });
		} catch (err) {
		  console.error('Ошибка при очистке корзины:', err);
		  throw err;
		}
	  }
	  

	hasDiscardedTasks() {
		return this.#tasks.some(t => t.status === STATUS_NAMES.DISCARDED);
	}
}
