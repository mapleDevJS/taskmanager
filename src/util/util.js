export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      if (element.length > 1) {
        Array.from(element).forEach((it) => {
          container.prepend(it);
        });
      } else {
        container.prepend(element);
      }
      break;
    case RenderPosition.BEFOREEND:
      if (element.length > 1) {
        Array.from(element).forEach((it) => {
          container.append(it);
        });
      } else {
        container.append(element);
      }
      break;
  }
};
