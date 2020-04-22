import {COLORS, DAYS, MONTH_NAMES} from "../../util/consts";
import {createElement} from "../../util/dom-util";
import {formatTime} from "../../util/util";
import RepeatingDay from "./repeating-day";
import Color from "./task-color";

export default class TaskEdit {
  constructor(task) {
    this._task = task;
    this._color = task.color;
    this._description = task.description;
    this._isDateShowing = !!task.dueDate;
    this._repeatingDays = task.repeatingDays;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._element = null;
  }

  _toggleYesNo(element) {
    return element ? `yes` : `no`;
  }

  _showDeadline() {
    return this._isDateShowing ?
      `<fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder=""
                        name="date"
                        value="${this._getDate()} ${this._getTime()}"
                      />
                    </label>
                  </fieldset>`
      : ``;
  }

  _getRepeatingTaskMarkup(repeatingDaysMarkup) {
    return this._isRepeatingTask ?
      `<fieldset class="card__repeat-days">
          <div class="card__repeat-days-inner">
            ${repeatingDaysMarkup}
          </div>
        </fieldset>`
      : ``;
  }

  _getDate() {
    return this._isDateShowing ? `${this._task.dueDate.getDate()} ${MONTH_NAMES[this._task.dueDate.getMonth()]}` : ``;
  }

  _getTime() {
    return this._isDateShowing ? formatTime(this._task.dueDate) : ``;
  }

  _getDeadlineClass() {
    return this._task.dueDate instanceof Date && this._task.dueDate < Date.now() ? `card--deadline` : ``;
  }

  _getRepeatClass() {
    return this._isRepeatingTask ? `card--repeat` : ``;
  }

  _getRepeatingDaysMarkup() {
    return new RepeatingDay(DAYS, this._repeatingDays).getTemplate();
  }

  getTemplate() {
    return (
      `<article class="card card--edit card--${this._color} ${this._getRepeatClass()} ${this._getDeadlineClass()}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._toggleYesNo(this._isDateShowing)}</span>
                  </button>
                  ${this._showDeadline()}
                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._toggleYesNo(this._isRepeatingTask)}</span>
                  </button>
                  ${this._getRepeatingTaskMarkup(this._isRepeatingTask, this._getRepeatingDaysMarkup())}
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                ${new Color(COLORS, this._color).getTemplate()}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
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
