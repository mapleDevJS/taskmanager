import Abstract from "../abstract";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

export default class Filter extends Abstract {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return this._createFilterTemplate(this._filters);
  }

  _createFilterMarkup(filter, isChecked) {
    const {name, count} = filter;

    return (
      `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span></label
      >`
    );
  }

  _createFilterTemplate(filters) {
    const filtersMarkup = filters.map((it) => this._createFilterMarkup(it, it.checked)).join(`\n`);

    return `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`;
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
