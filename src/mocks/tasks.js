import {COLORS, DAYS} from "../utils/consts";
import {getRandomBoolean, getRandomDate, getRandomItem} from "../utils/utils";

export const DESCRIPTION_ITEMS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const generateRepeatingDays = (dueDate) => {
  const repeatingDays = new Map();

  for (const day of DAYS) {
    repeatingDays.set(day, dueDate !== null ? getRandomBoolean() : false);
  }

  return repeatingDays;
};

export const generateTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    description: getRandomItem(DESCRIPTION_ITEMS),
    dueDate,
    repeatingDays: generateRepeatingDays(dueDate),
    color: getRandomItem(COLORS),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};
