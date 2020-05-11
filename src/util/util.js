import moment from "moment";

export const getRandomBoolean = () => Math.random() > 0.5;
export const getRandomSign = () => getRandomBoolean() ? 1 : -1;

export const getRandomIntegerNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const delta = getRandomSign() * getRandomIntegerNumber(8);

  targetDate.setDate(targetDate.getDate() + delta);

  return targetDate;
};


export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

export const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};
