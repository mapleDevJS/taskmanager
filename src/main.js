import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {addListeners} from "./components/load-more-button";
import {QuantityTasks} from "./consts";
import {generateTasks} from "./mocks/tasks";

export const tasks = generateTasks(QuantityTasks.TOTAL);
console.log(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export let showingTasksCount = QuantityTasks.ON_START;

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());
addListeners();
