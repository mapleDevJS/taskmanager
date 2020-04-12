import {tasks} from "../main";

const FILTER_NAMES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];

const countTodayTasks = (tasksData) => {
  return tasksData.filter((task) => {
    if (!task.dueDate) {
      return false;
    }
    return (task.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
  });
};

const generateFilters = (taskData) => {
  const quantitytByName = {
    all: taskData,
    overdue: taskData.filter((task) => task.dueDate < new Date()),
    today: countTodayTasks(taskData),
    favorites: taskData.filter((task) => task.isFavorite),
    repeating: taskData.filter((task) => task.isRepeat),
    archive: taskData.filter((task) => task.isArchive),
  };

  const quantityByName = FILTER_NAMES.reduce((list, name) => {
    list[name] = quantitytByName[name].length;

    return list;
  }, {});

  return FILTER_NAMES.map((name, index) => {
    const count = quantityByName[name] || 0;

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

export const createFilterTemplate = () => {
  const filters = generateFilters(tasks);
  const filtersMarkup = filters.map(createFilterMarkup).join(`\n`);

  return `<section class="main__filter filter container">
    ${filtersMarkup}
  </section>`;
};
