import {createElements} from "../../util/dom-util";
import Abstract from "../abstract";

export default class TaskColor extends Abstract {
  constructor(color, index, currentColor) {
    super();
    this._color = color;
    this._index = index;
    this._currentColor = currentColor;
  }

  getTemplate() {
    return (
      `<input
        type="radio"
        id="color-${this._color}-${this._index}"
        class="card__color-input card__color-input--${this._color} visually-hidden"
        name="color"
        value="${this._color}"
        ${this._currentColor === this._color ? `checked` : ``}
        />
      <label
        for="color-${this._color}-${this._index}"
        class="card__color card__color--${this._color}"
        >${this._color}</label
      >`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElements(this.getTemplate());
    }

    return this._element;
  }
}
