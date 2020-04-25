import Board from "./components/board/board";
import Filter from "./components/filter/filter";
import SiteMenu from "./components/menu/site-menu";
import BoardController from "./controllers/board";
import {QuantityTasks} from "./util/consts";
import {generateTasks} from "./mocks/tasks";
import {render} from "./util/dom-util";

const FILTER_NAMES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];

const countTodayTasks = (tasks) => {
  return tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }
    return (task.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
  });
};

const generateFilters = (tasks) => {
  const quantityByName = {
    all: tasks,
    overdue: tasks.filter((task) => task.dueDate < new Date()),
    today: countTodayTasks(tasks),
    favorites: tasks.filter((task) => task.isFavorite),
    repeating: tasks.filter((task) => task.isRepeat),
    archive: tasks.filter((task) => task.isArchive),
  };

  const filtersCount = FILTER_NAMES.reduce((list, name) => {
    list[name] = quantityByName[name].length;

    return list;
  }, {});

  return FILTER_NAMES.map((name, index) => {
    const count = filtersCount[name] || 0;

    return {
      name,
      count,
      isChecked: index === 0
    };
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(QuantityTasks.TOTAL);
const filters = generateFilters(tasks);

render(siteHeaderElement, new SiteMenu());
render(siteMainElement, new Filter(filters, tasks));

const boardComponent = new Board();
const boardController = new BoardController(boardComponent);
render(siteMainElement, boardComponent);
boardController.render(tasks);
