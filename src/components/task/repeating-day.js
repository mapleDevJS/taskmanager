import {createElements} from "../../util/dom-util";

export default class RepeatingDay {
  constructor(day, index, repeatingDays) {
    // console.log(day, index, isChecked);
    this._day = day;
    this._repeatingDays = repeatingDays;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    const isChecked = this._repeatingDays[this._day];
    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${this._day}-${this._index}"
        name="repeat"
        value="${this._day}"
        ${isChecked ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${this._day}-${this._index}"
        >${this._day}</label
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

