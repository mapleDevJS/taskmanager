import {createElement} from "../../util/dom-util";

const SORT_TYPES = [
  `DEFAULT`,
  `DATE up`,
  `DATE down`
];

export default class Sort {
  constructor() {
    this._element = null;
  }

  _getSortTemplate() {
    return (`
    <div class="board__filter-list">
      ${SORT_TYPES.map((type) =>
        `<a href="#" class="board__filter">SORT BY ${type}</a>`).join(`\n`)}
    </div>
  `).trim();
  }

  getTemplate() {
    return (
      `<div class="board__filter-list">
        ${this._getSortTemplate()}
      </div>`
    );
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
