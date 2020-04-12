import {createSortingTemplate} from "./board-sorting";
import {createTaskTemplate} from "./task";
import {renderButtonLoadMore} from "./load-more-button.js";
import {tasks} from "../main";

export const renderTasks = (taskQuantity) => {
  let markup = ``;
  for (let i = 1; i < taskQuantity; i++) {
    markup += createTaskTemplate(tasks[i]);
  }
  return markup;
};

export const createBoardTemplate = () => {
  return `<section class="board container">
    ${createSortingTemplate()}
    <div class="board__tasks"></div>
    ${renderButtonLoadMore()}
  </section>`;
};
