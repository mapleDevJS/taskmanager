import {QUANTITY_TASKS} from "./task.js";
import {renderTasks} from "./task.js";

export const createBoardTemplate = () => {
  return `<section class="board container">
    <div class="board__tasks">
      ${renderTasks(QUANTITY_TASKS)}
    </div>
  </section>`;
};
