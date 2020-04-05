import {renderTasks} from "./task.js";

const QUANTITY_TASKS = 8;

export const createBoardTemplate = () => {
  return `<section class="board container">
    <div class="board__tasks">
      ${renderTasks(QUANTITY_TASKS)}
    </div>
  </section>`;
};
