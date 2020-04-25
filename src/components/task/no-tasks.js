import Abstract from "../abstract";

export default class NoTasks extends Abstract {
  getTemplate() {
    return (
      `<p class="board__no-tasks">
        Click «ADD NEW TASK» in menu to create your first task
      </p>`
    );
  }
}
