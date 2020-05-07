import moment from "moment";

const getRandomBoolean = () => Math.random() > 0.5;
const getRandomSign = () => getRandomBoolean() ? 1 : -1;

const getRandomIntegerNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const delta = getRandomSign() * getRandomIntegerNumber(8);

  targetDate.setDate(targetDate.getDate() + delta);

  return targetDate;
};


const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export {getRandomBoolean, getRandomItem, getRandomDate, formatTime, formatDate};
