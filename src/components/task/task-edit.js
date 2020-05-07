import {COLORS, DAYS} from "../../util/consts";
import {toMarkup} from "../../util/dom-util";
import {formatTime, formatDate} from "../../util/util";
import RepeatingDay from "./repeating-day";
import TaskColor from "./task-color";
// import Abstract from "../abstract";
import AbstractSmart from "../abstract-smart-component";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

export default class TaskEdit extends AbstractSmart {
  constructor(task) {
    super();
    this._task = task;
    this._color = task.color;
    this._description = task.description;
    this._isDateShowing = !!task.dueDate;
    this._repeatingDays = task.repeatingDays;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._flatpickr = null;

    this._submitHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  _toggleYesNo(element) {
    return element ? `yes` : `no`;
  }

  _showDeadline() {
    return (
      this._isDateShowing ?
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
        </fieldset>` : ``);
  }

  _getColorsMarkup() {
    return COLORS.map((color, index) => new TaskColor(color, index, this._color).getElement())
      .map(toMarkup)
      .join(`\n`);
  }


  _getRepeatingDaysMarkup(repeatingDays) {
    return DAYS.map((day, index) => new RepeatingDay(day, index, repeatingDays).getElement())
      .map(toMarkup)
      .join(`\n`);
  }

  _getRepeatingTaskMarkup() {
    return (
      this._isRepeatingTask ?
        `<fieldset class="card__repeat-days">
            <div class="card__repeat-days-inner">
              ${this._getRepeatingDaysMarkup(this._repeatingDays)}
            </div>
          </fieldset>`
        : ``);
  }

  _getDate() {
    return this._isDateShowing ? formatDate(this._task.dueDate) : ``;
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
                  ${this._getRepeatingTaskMarkup()}
                </div>
                <div class="card__colors-inner">
                  <h3 class="card__colors-title">Color</h3>
                  <div class="card__colors-wrap">
                    ${this._getColorsMarkup()}
                  </div>
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
  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = task.repeatingDays;
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._task.dueDate || `today`,
      });
    }
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        this.rerender();
      });

    element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;

        this.rerender();
      });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        // console.log(evt.target.checked);
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        // this.rerender();
      });
    }
  }
}
