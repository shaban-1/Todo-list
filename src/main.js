import { render, RenderPosition } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import BoardComponent from './view/board-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://680e8c1767c5abddd1926eb1.mockapi.io';
const bodyElement = document.querySelector('body');

render(new HeaderComponent(), bodyElement, RenderPosition.AFTERBEGIN);
const formAddTaskComponent = new FormAddTaskComponent({
	onClick: handleCreateNewTaskClick
});
render(formAddTaskComponent, bodyElement);

const boardComponent = new BoardComponent();
render(boardComponent, bodyElement);

const tasksApiService = new TasksApiService(END_POINT);
const taskModel = new TaskModel({ tasksApiService });
const tasksBoardPresenter = new TasksBoardPresenter({
    boardComponent: boardComponent,
    taskModel: taskModel,
});
tasksBoardPresenter.init();

function handleCreateNewTaskClick() {
	tasksBoardPresenter.createTask();
}