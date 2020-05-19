import Board from "./components/board/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import Statistics from "./components/statistics";
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

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const statisticsComponent = new Statistics({tasks: tasksModel, dateFrom, dateTo});
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();


siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});
