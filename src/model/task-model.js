import { tasks } from '../mock/task.js';
import { STATUS_NAMES } from '../const.js';
import { generateID } from '../utils.js';

export default class TaskModel {
	#boardtasks = tasks;
	#observers = [];

	get tasks() {
		return this.#boardtasks;
	}

	getTasksByStatus(status) {
		return this.#boardtasks.filter(task => task.status === status);
	}

	addTask(title) {
		const newTask = {
			id: generateID(),
			title,
			status: STATUS_NAMES.PENDING
		};
		this.#boardtasks.push(newTask);
		this._notifyObservers();
		return newTask;
	}

	updateTaskStatus(taskId, newStatus, newIndex = null) {
		const id = String(taskId);
		const oldIndex = this.#boardtasks.findIndex(t => String(t.id) === id);
		if (oldIndex === -1) return;

		const [ task ] = this.#boardtasks.splice(oldIndex, 1);
		task.status = newStatus;

		if (newIndex === null) {
			this.#boardtasks.push(task);
		} else {
			const statusIndices = this.#boardtasks
				.map((t, idx) => t.status === newStatus ? idx : -1)
				.filter(idx => idx !== -1);

			let insertIndex;

			if (newIndex >= statusIndices.length) {
				insertIndex = statusIndices[statusIndices.length - 1] + 1;
			} else {
				insertIndex = statusIndices[newIndex];
			}

			if (statusIndices.length === 0) {
				insertIndex = this.#boardtasks.length;
			}

			this.#boardtasks.splice(insertIndex, 0, task);
		}

		this._notifyObservers();
	}
	
	removeTask(taskId){
		this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
		this._notifyObservers();
	}

	addObserver(observer){
		this.#observers.push(observer);
	}

	removeObserver(observer){
		this.#observers = this.#observers.filter((obs) => obs !== observer);
	}

	_notifyObservers(){
		this.#observers.forEach((observer) => observer());
	}
}
