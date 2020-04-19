import {createElement} from "../../util/util.js";

const FILTER_NAMES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];

const countTodayTasks = (tasks) => {
  return tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }
    return (task.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
  });
};

export const generateFilters = (tasks) => {
  const quantityByName = {
    all: tasks,
    overdue: tasks.filter((task) => task.dueDate < new Date()),
    today: countTodayTasks(tasks),
    favorites: tasks.filter((task) => task.isFavorite),
    repeating: tasks.filter((task) => task.isRepeat),
    archive: tasks.filter((task) => task.isArchive),
  };

  const filtersCount = FILTER_NAMES.reduce((list, name) => {
    list[name] = quantityByName[name].length;

    return list;
  }, {});

  return FILTER_NAMES.map((name, index) => {
    const count = filtersCount[name] || 0;

    return {
      name,
      count,
      isChecked: index === 0
    };
  });
};

export const createFilterMarkup = ({name, count, isChecked}) => {
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
};

export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map(createFilterMarkup).join(`\n`);

  return `<section class="main__filter filter container">
    ${filtersMarkup}
  </section>`;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
