import {createSiteMenuTemplate} from "./components/menu/site-menu";
import {createFilterTemplate} from "./components/filter/filter";
import {createBoardTemplate} from "./components/board/board";
import {createTaskTemplate} from "./components/task/task";
import {createTaskEditTemplate} from "./components/task/task-edit";
import {addListenerOnLoadMoreButton} from "./components/board/load-more-button";
import {QuantityTasks} from "./util/consts";
import {generateTasks} from "./mocks/tasks";

const tasks = generateTasks(QuantityTasks.TOTAL);


let showingTasksCount = QuantityTasks.ON_START;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

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

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(tasks));
render(siteMainElement, createBoardTemplate());

const boardTasksElement = document.querySelector(`.board__tasks`);
renderTasks(boardTasksElement, createTaskEditTemplate, 0, 1);
renderTasks(boardTasksElement, createTaskTemplate, 1, showingTasksCount);

addListenerOnLoadMoreButton(loadMoreClickHandler);
