import {createElement} from "../../util/util.js";

export default class RepeatingDay {
  constructor(days, repeatingDays) {
    this._days = days;
    this._repeatingDays = repeatingDays;
    this._element = null;
  }

  getTemplate() {
    return this._days
    .map((day, index) => {
      const isChecked = this._repeatingDays[day];
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-${index}"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-${index}"
          >${day}</label
        >`
      );
    })
    .join(`\n`);
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

