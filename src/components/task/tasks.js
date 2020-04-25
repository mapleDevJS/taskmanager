import Abstract from "../abstract";

export default class Tasks extends Abstract {
  getTemplate() {
    return (
      `<div class="board__tasks"></div>`
    );
  }
}
