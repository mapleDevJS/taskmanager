import BoardComponent from "./components/board/board";
import FilterComponent from "./components/filter/filter";
import TaskEditComponent from "./components/task/task-edit";
import TaskComponent from "./components/task/task";
import TasksComponent from "./components/task/tasks";
import SiteMenuComponent from "./components/menu/site-menu";
import SortComponent from "./components/board/sorting";
import {QuantityTasks} from "./util/consts";
import {generateTasks} from "./mocks/tasks";
import {render} from "./util/util";


let showingTasksCount = QuantityTasks.ON_START;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTasks = (container, template, start, end) => {
  tasks.slice(start, end).forEach((task) => render(container, template(task)));
};

const loadMoreClickHandler = () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount += QuantityTasks.BY_BUTTON;

  if (showingTasksCount > tasks.length) {
    renderTasks(boardTasksElement, createTaskTemplate, prevTasksCount, tasks.length);
    document.querySelector(`.load-more`).remove();
  } else {
    renderTasks(boardTasksElement, createTaskTemplate, prevTasksCount, showingTasksCount);
  }
};

const tasks = generateTasks(QuantityTasks.TOTAL);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(tasks));
render(siteMainElement, createBoardTemplate());

const boardTasksElement = document.querySelector(`.board__tasks`);
renderTasks(boardTasksElement, createTaskEditTemplate, 0, 1);
renderTasks(boardTasksElement, createTaskTemplate, 1, showingTasksCount);

// addListenerOnLoadMoreButton(loadMoreClickHandler);

