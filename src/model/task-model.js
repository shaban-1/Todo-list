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
