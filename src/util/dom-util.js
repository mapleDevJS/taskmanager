const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const createElements = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement;
};

const toMarkup = (element) => {
  const temp = document.createElement(`div`);
  temp.append(element);
  console.log(temp.innerHTML);
  return temp.innerHTML;
};

export {createElement, createElements, toMarkup};
