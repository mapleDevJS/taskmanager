import {COLORS, DEFAULT_REPEATING_DAYS} from "../consts";
import {getRandomBoolean, getRandomDate, getRandomItem} from "../utils";

export const DESCRIPTION_ITEMS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const generateRepeatingDays = () => {
  const repeatingDays = {};
  for (const key of Object.keys(DEFAULT_REPEATING_DAYS)) {
    repeatingDays[key] = getRandomBoolean();
  }
  return repeatingDays;
};

export const generateTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    description: getRandomItem(DESCRIPTION_ITEMS),
    dueDate,
    repeatingDays: dueDate ? Object.assign({}, DEFAULT_REPEATING_DAYS) : generateRepeatingDays(),
    color: getRandomItem(COLORS),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};
