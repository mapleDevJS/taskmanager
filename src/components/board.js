import {createSortingTemplate} from "./board-sorting";
// import {createTaskTemplate} from "./task";
import {createLoadMoreButtonTemplate} from "./load-more-button.js";
// import {tasks} from "../main";

// export const renderTasks = (start, end) => {
//   let markup = ``;
//   for (let i = start; i < end; i++) {
//     markup += createTaskTemplate(tasks[i]);
//   }
//   return markup;
// };

export const createBoardTemplate = () => {
  return `<section class="board container">
    ${createSortingTemplate()}
    <div class="board__tasks"></div>
    ${createLoadMoreButtonTemplate()}
  </section>`;
};
