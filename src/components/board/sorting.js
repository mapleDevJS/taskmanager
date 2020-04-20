import {createElement} from "../../util/util.js";

const SortTypes = [
  `DEFAULT`,
  `DATE up`,
  `DATE down`
];

export default class Sort {
  constructor() {
    this._element = null;
  }

  _getSortTemplate() {
    let markup = ``;
    for (const type of SortTypes) {
      markup += `<a href="#" class="board__filter">SORT BY ${type}</a>`;
    }
    return markup;
  }

  getTemplate() {
    return `<div class="board__filter-list">
    ${this._getSortTemplate()}
    </div>`;
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
