import {createSortingTemplate} from "./board-sorting";
import {createTaskTemplate} from "./task";
import {renderTaskEdit} from "./task-edit";
import {renderButtonLoadMore} from "./load-more-button.js";
import {tasks} from "../main";

const renderTasks = (taskQuantity) => {
  let markup = ``;
  for (let i = 1; i < taskQuantity; i++) {
    markup += createTaskTemplate(tasks[i]);
  }
  return markup;
};

const createBoardTemplate = () => {
  return `<section class="board container">
    ${createSortingTemplate()}
    <div class="board__tasks">
      ${renderTaskEdit()}
      ${renderTasks(showingTasksCount)}
    </div>
    ${renderButtonLoadMore()}
  </section>`;
};

export {createBoardTemplate};
