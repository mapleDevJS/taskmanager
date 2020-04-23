import {createElements} from "../../util/dom-util";

export default class TaskColor {
  constructor(color, index, currentColor) {
    this._color = color;
    this._index = index;
    this._currentColor = currentColor;
    this._element = null;
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
        for="color-${this._color}--${this._index}"
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

  removeElement() {
    this._element = null;
  }
}


