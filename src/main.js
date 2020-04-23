import Board from "./components/board/board";
import LoadMoreButton from "./components/board/load-more-button";
import Filter from "./components/filter/filter";
import TaskEdit from "./components/task/task-edit";
import Task from "./components/task/task";
import Tasks from "./components/task/tasks";
import NoTasksComponent from "./components/task/no-tasks";
import SiteMenu from "./components/menu/site-menu";
import Sort from "./components/board/sort";
import {QuantityTasks} from "./util/consts";
import {generateTasks} from "./mocks/tasks";
import {render} from "./util/util";

const FILTER_NAMES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];

const countTodayTasks = (tasks) => {
  return tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }
    return (task.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
  });
};

const generateFilters = (tasks) => {
  const quantityByName = {
    all: tasks,
    overdue: tasks.filter((task) => task.dueDate < new Date()),
    today: countTodayTasks(tasks),
    favorites: tasks.filter((task) => task.isFavorite),
    repeating: tasks.filter((task) => task.isRepeat),
    archive: tasks.filter((task) => task.isArchive),
  };

  const filtersCount = FILTER_NAMES.reduce((list, name) => {
    list[name] = quantityByName[name].length;

    return list;
  }, {});

  return FILTER_NAMES.map((name, index) => {
    const count = filtersCount[name] || 0;

    return {
      name,
      count,
      isChecked: index === 0
    };
  });
};

const renderTask = (taskListElement, task) => {
  const openTaskEditor = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const closeTaskEditor = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeTaskEditor();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new Task(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    openTaskEditor();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    closeTaskEditor();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (boardComponent) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent().getElement());
    return;
  }

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

    tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(taskListElement, task));

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
