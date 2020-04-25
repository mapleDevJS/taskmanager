import Abstract from "../abstract.js";

const MENU_ITEMS = new Map([
  [`new-task`, `+ ADD NEW TASK`],
  [`task`, `TASKS`],
  [`statistic`, `STATISTICS`]
]);
export default class SiteMenu extends Abstract {
  _getMenuItem(key, value) {
    return (`
        <input
          type="radio"
          name="control"
          id="control__${key}"
          class="control__input visually-hidden"
        />
        <label for="control__${key}" class="control__label control__label--${key}"
          >${value}</label
        >`);
  }

  _getMenuMarkup() {
    return [...MENU_ITEMS.entries()]
      .map(([value, key]) => this._getMenuItem(value, key))
      .join(`\n`);
  }

  getTemplate() {
    return (
      `<section class="control__btn-wrap">
        ${this._getMenuMarkup()}
      </section>`
    );
  }
}
