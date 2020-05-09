import Board from "./components/board/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import SiteMenu, {MenuItem} from "./components/menu/site-menu";
import TasksModel from "./models/tasks";
import {QuantityTasks} from "./util/consts";
import {generateTasks} from "./mocks/tasks";
import {render} from "./util/dom-util";

// const FILTER_NAMES = [
//   `all`,
//   `overdue`,
//   `today`,
//   `favorites`,
//   `repeating`,
//   `archive`
// ];

// const countTodayTasks = (tasks) => {
//   return tasks.filter((task) => {
//     if (!task.dueDate) {
//       return false;
//     }
//     return (task.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
//   });
// };

// const generateFilters = (tasks) => {
//   const quantityByName = {
//     all: tasks,
//     overdue: tasks.filter((task) => task.dueDate < new Date()),
//     today: countTodayTasks(tasks),
//     favorites: tasks.filter((task) => task.isFavorite),
//     repeating: tasks.filter((task) => task.isRepeat),
//     archive: tasks.filter((task) => task.isArchive),
//   };

//   const filtersCount = FILTER_NAMES.reduce((list, name) => {
//     list[name] = quantityByName[name].length;

//     return list;
//   }, {});

//   return FILTER_NAMES.map((name, index) => {
//     const count = filtersCount[name] || 0;

//     return {
//       name,
//       count,
//       isChecked: index === 0
//     };
//   });
// };

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenu();

render(siteHeaderElement, siteMenuComponent);

const tasks = generateTasks(QuantityTasks.TOTAL);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

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
