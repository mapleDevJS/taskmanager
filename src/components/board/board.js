import {createElement} from "../../util/util.js";
import {createSortingTemplate} from "./sorting";
import {createLoadMoreButtonTemplate} from "./load-more-button.js";

export const createBoardTemplate = () => {
  return `<section class="board container">
    ${createSortingTemplate()}
    <div class="board__tasks"></div>
    ${createLoadMoreButtonTemplate()}
  </section>`;
};
export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
