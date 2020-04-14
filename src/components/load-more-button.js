export const createLoadMoreButtonTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export const addListenerOnLoadMoreButton = (cb) =>
  document.querySelector(`.load-more`).addEventListener(`click`, cb);
