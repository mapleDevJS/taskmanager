import {COLORS, DAYS} from "../consts";
import {getRandomBoolean, getRandomDate, getRandomItem} from "../utils";

export const DESCRIPTION_ITEMS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const generateRepeatingDays = (dueDate) => {
  const repeatingDays = new Map();

  if (dueDate === null) {
    for (const day of DAYS) {
      repeatingDays.set(day, false);
    }
  } else {
    for (const day of DAYS) {
      repeatingDays.set(day, getRandomBoolean());
    }
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
