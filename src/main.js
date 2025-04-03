import { render, RenderPosition } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import BoardComponent from './view/board-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';

const bodyElement = document.querySelector('body');

render(new HeaderComponent(), bodyElement, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), bodyElement);

const boardComponent = new BoardComponent();
render(boardComponent, bodyElement);

const taskModel = new TaskModel();  
const tasksBoardPresenter = new TasksBoardPresenter({
    boardComponent: boardComponent,
    taskModel: taskModel,
});
tasksBoardPresenter.init();
