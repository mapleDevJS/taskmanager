import {MONTH_NAMES} from "../../util/consts";
import {createElement, formatTime} from "../../util/util";

export default class Task {
  constructor(task) {
    this._task = task;
    this._color = task.color;
    this._description = task.description;
    this._isDateShowing = !!task.dueDate;
    this._repeatingDays = task.repeatingDays;
    this._element = null;
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

  _getArchiveButtonClass() {
    return this._task.isArchive ? `` : `card__btn--disabled`;
  }

  _getFavouriteButtonClass() {
    return this._task.isFavorite ? `` : `card__btn--disabled`;
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${this._getRepeatClass()} ${this._getDeadlineClass()}">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive ${this._getArchiveButtonClass()}">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${this._getFavouriteButtonClass()}"
              >
                favorites
              </button>
            </div>
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
            <div class="card__textarea-wrap">
              <p class="card__text">${this._description}</p>
            </div>
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date">${this._getDate()}</span>
                      <span class="card__time">${this._getTime()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>`;
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
