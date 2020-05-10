import Board from "./components/board/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import SiteMenu, {MenuItem} from "./components/menu/site-menu";
import TasksModel from "./models/tasks";
import {QuantityTasks} from "./util/consts";
import {generateTasks} from "./mocks/tasks";
import {render} from "./util/dom-util";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenu();

render(siteHeaderElement, siteMenuComponent);

const tasks = generateTasks(QuantityTasks.TOTAL);
const tasksModel = new TasksModel();
tasksModel.tasks = tasks;

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new Board();
render(siteMainElement, boardComponent);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});
