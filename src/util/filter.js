import {isRepeating, isOneDay, isOverdueDate} from "./util";
import {FilterType} from "./consts";

export const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

export const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

export const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

export const getOverdueTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return false;
    }

    return isOverdueDate(dueDate, date);
  });
};

export const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeating(task.repeatingDays));
};

export const getTasksInOneDay = (tasks, date) => {
  return tasks.filter((task) => isOneDay(task.dueDate, date));
};

const Filter = {
  ALL: (task) => !task.isArchive,
  ARCHIVE: (task) => task.isArchive,
  FAVORITES: (task) => task.isFavorite,
  OVERDUE: (task) => {
    if (!task.dueDate) {
      return false;
    }
    return isOverdueDate(task.dueDate, new Date());
  },
  REPEATING: (task) => isRepeating(task.repeatingDays),
  TODAY: (task) => !task.isArchive ? isOneDay(task.dueDate, new Date()) : ``
};

export const getTasksByFilter = (tasks, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return tasks.filter(Filter.ALL);
    case FilterType.ARCHIVE:
      return tasks.filter(Filter.ARCHIVE);
    case FilterType.FAVORITES:
      return tasks.filter(Filter.FAVORITES);
    case FilterType.OVERDUE:
      return tasks.filter(Filter.OVERDUE);
    case FilterType.REPEATING:
      return tasks.filter(Filter.REPEATING);
    case FilterType.TODAY:
      return tasks.filter(Filter.TODAY);
  }

  return tasks;
};
