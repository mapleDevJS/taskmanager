import Board from "./components/board/board";
import LoadMoreButton from "./components/board/load-more-button";
import Filter from "./components/filter/filter";
import TaskEdit from "./components/task/task-edit";
import Task from "./components/task/task";
import Tasks from "./components/task/tasks";
import SiteMenu from "./components/menu/site-menu";
import Sort from "./components/board/sorting";
import {QuantityTasks} from "./util/consts";
import {generateFilters} from "./components/filter/filter";
import {generateTasks} from "./mocks/tasks";
import {render} from "./util/util";

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new Task(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (boardComponent) => {
  render(boardComponent.getElement(), new Sort().getElement());
  render(boardComponent.getElement(), new Tasks().getElement());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = QuantityTasks.ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButtonComponent = new LoadMoreButton();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement());

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + QuantityTasks.BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(QuantityTasks.TOTAL);
const filters = generateFilters(tasks);

render(siteHeaderElement, new SiteMenu().getElement());
render(siteMainElement, new Filter(filters, tasks).getElement());

const boardComponent = new Board();
render(siteMainElement, boardComponent.getElement());
renderBoard(boardComponent);
