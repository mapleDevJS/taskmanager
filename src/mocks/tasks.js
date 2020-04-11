import {COLORS, DESCRIPTION_ITEMS, QuantityTasks, DEFAULT_REPEATING_DAYS} from "../consts";
import {getRandomBoolean, getRandomDate, getRandomItem} from "../utils";

const generateRepeatingDays = () => {
  const repeatingDays = {};
  for (const key of Object.keys(DEFAULT_REPEATING_DAYS)) {
    repeatingDays[key] = getRandomBoolean();
  }
  return repeatingDays;
};

const generateTask = () => {
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

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

const tasks = generateTasks(QuantityTasks.TOTAL);
console.log(tasks);

export {tasks};
