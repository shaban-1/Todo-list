import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearTrashButtonComponent from '../view/task-button-component.js';
import TaskModel from '../model/task-model.js';
import { render, RenderPosition } from '../framework/render.js';
import { STATUS_NAMES } from '../const.js';

export default class TasksBoardPresenter {
    constructor(boardComponent) {
        this.boardComponent = boardComponent;
        this.taskModel = new TaskModel();
        this.taskLists = {};
    }

    init() {
        const tasks = this.taskModel.tasks;
        const statusValues = Object.keys(STATUS_NAMES);

        for (let i = 0; i < statusValues.length; i++) {
            const status = statusValues[i];
            const tasksListComponent = new TasksListComponent(STATUS_NAMES[status], status);
            render(tasksListComponent, this.boardComponent.getElement());
            this.taskLists[status] = tasksListComponent;

            for (let j = 0; j < tasks.length; j++) {
                if (tasks[j].status === status) {
                    const taskComponent = new TaskComponent(tasks[j]);
                    render(taskComponent, tasksListComponent.getElement());
                }
            }

            if (status === 'discarded') {
                const clearButton = new ClearTrashButtonComponent();
                render(clearButton, tasksListComponent.getElement());
            }
        }
    }
}
