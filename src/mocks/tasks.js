import {COLORS, DAYS} from "../util/consts";
import {getRandomBoolean, getRandomDate, getRandomItem} from "../util/util";

const TASK_DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const getRandomRepeating = (dueDate) => {
  const repeatingDays = new Map();

  for (const day of DAYS) {
    repeatingDays.set(day, dueDate !== null ? getRandomBoolean() : false);
  }

  return repeatingDays;
};

const generateTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    description: getRandomItem(TASK_DESCRIPTIONS),
    dueDate,
    repeatingDays: getRandomRepeating(dueDate),
    color: getRandomItem(COLORS),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};


