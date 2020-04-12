import {QuantityTasks} from "../consts";
import {createTaskTemplate} from "./task";
import {tasks} from "../main";
import {render} from "../main";
import {showingTasksCount} from "../consts";

export const createLoadMoreButtonTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

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

export const addListeners = () => {
  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, loadMoreClickHandler);
};
