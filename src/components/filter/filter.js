import Abstract from "../abstract";
export default class Filter extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _createFilterMarkup({name, count, isChecked}) {
    return (
      `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span></label
      >`
    );
  }

  getTemplate() {
    return (
      `<section class="main__filter filter container">
        ${this._filters.map(this._createFilterMarkup).join(`\n`)}
      </section>`
    );
  }
}
