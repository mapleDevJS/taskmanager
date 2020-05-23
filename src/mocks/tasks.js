// import {COLORS, DAYS} from "../util/consts";
// import {getRandomBoolean, getRandomDate, getRandomItem} from "../util/util";

// const TASK_DESCRIPTIONS = [
//   `Изучить теорию`,
//   `Сделать домашку`,
//   `Пройти интенсив на соточку`
// ];

// const getRandomRepeating = (dueDate) => {
//   const repeatingDays = {};

//   DAYS.map((day) => {
//     repeatingDays[day] = (dueDate === null) ? getRandomBoolean() : false;
//   });

//   return repeatingDays;
// };

// const generateTask = () => {
//   const dueDate = getRandomBoolean() ? null : getRandomDate();

//   return {
//     id: String(new Date() + Math.random()),
//     description: getRandomItem(TASK_DESCRIPTIONS),
//     dueDate,
//     repeatingDays: getRandomRepeating(dueDate),
//     color: getRandomItem(COLORS),
//     isArchive: getRandomBoolean(),
//     isFavorite: getRandomBoolean(),
//   };
// };

// export const generateTasks = (count) => {
//   return new Array(count).fill(``).map(generateTask);
// };
