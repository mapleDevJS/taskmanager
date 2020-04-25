import Abstract from "../abstract";

export default class LoadMoreButton extends Abstract {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
