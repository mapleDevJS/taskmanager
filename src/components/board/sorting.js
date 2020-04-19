import {createElement} from "../../util/util.js";

const SortTypes = [
  `DEFAULT`,
  `DATE up`,
  `DATE down`
];

const createSortTemplate = () => {
  let markup = ``;
  for (const type of SortTypes) {
    markup += `<a href="#" class="board__filter">SORT BY ${type}</a>`;
  }
  return markup;
};

export const createSortingTemplate = () => {
  return `<div class="board__filter-list">
    ${createSortTemplate()}
  </div>`;
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
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
