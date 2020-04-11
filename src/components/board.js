import {renderSort} from "./sorting";
import {renderTasks} from "./tasks";
import {renderTaskEdit} from "./task-edit";
import {renderButtonLoadMore, showingTasksCount} from "./load-more-button.js";

const createBoardTemplate = () => {
  return `<section class="board container">
    ${renderSort()}
    <div class="board__tasks">
      ${renderTaskEdit()}
      ${renderTasks(showingTasksCount)}
    </div>
    ${renderButtonLoadMore()}
  </section>`;
};

export {createBoardTemplate};
