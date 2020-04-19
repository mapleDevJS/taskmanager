import BoardComponent from "./components/board/board";
import FilterComponent from "./components/filter/filter";
import TaskEditComponent from "./components/task/task-edit";
import TaskComponent from "./components/task/task";
import TasksComponent from "./components/task/tasks";
import SiteMenuComponent from "./components/menu/site-menu";
import SortComponent from "./components/board/sorting";
import {QuantityTasks} from "./util/consts";
import {generateFilters} from "./components/filter/filter";
import {generateTasks} from "./mocks/tasks";
import {render} from "./util/util";


// let showingTasksCount = QuantityTasks.ON_START;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(QuantityTasks.TOTAL);
const filters = generateFilters(tasks);

const renderTask = () => {};

const renderBoard = () => {};

render(siteHeaderElement, new SiteMenuComponent().getElement());
render(siteMainElement, new FilterComponent(filters).getElement());
