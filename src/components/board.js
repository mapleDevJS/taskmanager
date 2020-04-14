import {createSortingTemplate} from "./board-sorting";
import {createLoadMoreButtonTemplate} from "./load-more-button.js";

export const createBoardTemplate = () => {
  return `<section class="board container">
    ${createSortingTemplate()}
    <div class="board__tasks"></div>
    ${createLoadMoreButtonTemplate()}
  </section>`;
};
