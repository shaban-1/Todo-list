import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearTrashButtonComponent from '../view/task-button-component.js';
import TaskModel from '../model/task-model.js';
import { render, RenderPosition } from '../framework/render.js';
import { STATUS_NAMES, STATAUS_LABEL } from '../const.js';

export default class TasksBoardPresenter {
    #boardComponent = null;
    #taskModel = null;
    #taskLists = {};

    constructor({ boardComponent, taskModel }) {
        this.#boardComponent = boardComponent;
        this.#taskModel = taskModel;
    }

    init() {
        const tasks = [...this.#taskModel.tasks];
        const statusValues = Object.values(STATUS_NAMES);

        for (let i = 0; i < statusValues.length; i++) {
            const status = statusValues[i];
            const statusTitle = STATAUS_LABEL[status];
            const tasksListComponent = new TasksListComponent(statusTitle, status);
            render(tasksListComponent, this.#boardComponent.getElement());
            this.#taskLists[status] = tasksListComponent;

            for (let j = 0; j < tasks.length; j++) {
                if (tasks[j].status === status) {
                    const taskComponent = new TaskComponent(tasks[j]);
                    render(taskComponent, tasksListComponent.getElement());
                }
            }

            if (status === STATUS_NAMES.DISCARDED) {
                const clearButton = new ClearTrashButtonComponent();
                render(clearButton, tasksListComponent.getElement());
            }
        }
    }
}
