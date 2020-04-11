export const getRandomBoolean = () => Math.random() > 0.5;

export const generateCheckedStatus = () => {
  return getRandomBoolean ? `checked` : ``;
};

export const getRandomIntegerNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)]
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

