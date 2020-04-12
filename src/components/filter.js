import {tasks} from "../main";
import {generateFilters} from "../mocks/filter";

const createFilterMarkup = (filter) => {
  const {name, count, isChecked} = filter;

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

const createFilterTemplate = () => {
  const filters = generateFilters(tasks);
  const filtersMarkup = filters.map(createFilterMarkup).join(`\n`);

  return `<section class="main__filter filter container">
    ${filtersMarkup}
  </section>`;
};

export {createFilterTemplate};
