import { render, RenderPosition } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import BoardComponent from './view/board-component.js';
import TasksListComponent from './view/tasks-list-component.js';
import TaskComponent from './view/task-component.js';

const bodyElement = document.querySelector('body');
render(new HeaderComponent(), bodyElement, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), bodyElement);
const boardComponent = new BoardComponent();
render(boardComponent, bodyElement);

// --- Создаём списки (колонки) ---

const backlogComponent = new TasksListComponent('Бэклог', 'pending');
render(backlogComponent, boardComponent.getElement());
render(new TaskComponent('Выучить JS'), backlogComponent.getElement());
render(new TaskComponent('Выучить React'), backlogComponent.getElement());
render(new TaskComponent('Сделать домашку'), backlogComponent.getElement());

const inProgressComponent = new TasksListComponent('В процессе', 'in-progress');
render(inProgressComponent, boardComponent.getElement());
render(new TaskComponent('Выпить смузи'), inProgressComponent.getElement());
render(new TaskComponent('Попить воды'), inProgressComponent.getElement());

const completedComponent = new TasksListComponent('Готово', 'completed');
render(completedComponent, boardComponent.getElement());
render(new TaskComponent('Позвонить маме'), completedComponent.getElement());
render(new TaskComponent('Погладить кота'), completedComponent.getElement());

const discardedComponent = new TasksListComponent('Корзина', 'discarded', true);
render(discardedComponent, boardComponent.getElement());
render(new TaskComponent('Сходить погулять'), discardedComponent.getElement());
render(new TaskComponent('Прочитать Войну и Мир'), discardedComponent.getElement());
