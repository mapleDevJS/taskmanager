import Abstract from "../abstract";

export const SortType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  DATE_DOWN: `date-down`
};

export default class Sort extends Abstract {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  _getSortTemplate() {
    let markup = ``;
    for (let [value, key] of Object.entries(SortType)) {
      markup += `<a href="#" data-sort-type="${key}" class="board__filter">SORT BY ${value}</a>`;
    }
    return markup;
  }

  getTemplate() {
    return (
      `<div class="board__filter-list">
        ${this._getSortTemplate()}
      </div>`
    );
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
