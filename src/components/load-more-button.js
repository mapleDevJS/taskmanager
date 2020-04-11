import {QuantityTasks} from "../consts";
import {tasks, createTaskTemplate} from "./tasks";
import {render} from "../main";

const renderButtonLoadMore = () => {
  return createLoadMoreButtonTemplate();
};

const createLoadMoreButtonTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

let showingTasksCount = QuantityTasks.ON_START;

const loadMoreClickHandler = () => {
  const taskListElement = document.querySelector(`.board__tasks`);
  const prevTasksCount = QuantityTasks.ON_START;
  showingTasksCount += QuantityTasks.BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    document.querySelector(`.load-more`).remove();
  }
};

const addListeners = () => {
  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, loadMoreClickHandler);
};

export {renderButtonLoadMore, showingTasksCount, addListeners};
