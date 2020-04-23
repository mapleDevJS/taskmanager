const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

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

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const render = (container, element, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
  }
};

export {RenderPosition, getRandomBoolean, getRandomItem, getRandomDate, formatTime, render};
