import {FILTER_NAMES} from "../consts";

const countTodayTasks = (tasks) => {
  return tasks.filter((task) => {
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

export {generateFilters};
