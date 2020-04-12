import {createSortingTemplate} from "./board-sorting";
import {renderTasks} from "./task";
import {renderTaskEdit} from "./task-edit";
import {renderButtonLoadMore, showingTasksCount} from "./load-more-button.js";

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
