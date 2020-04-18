const SortTypes = [
  `DEFAULT`,
  `DATE up`,
  `DATE down`
];

const createSortingTypes = () => {
  let markup = ``;
  for (const type of SortTypes) {
    markup += `<a href="#" class="board__filter">SORT BY ${type}</a>`;
  }
  return markup;
};

export const createSortingTemplate = () => {
  return `<div class="board__filter-list">
    ${createSortingTypes()}
  </div>`;
};
