import {picturesData, pictureList, getPictureElement} from './create-picture-list.js';
import {getRandomArrayElement, renderPack, debounce} from './utils';

const filterSort = document.querySelector('.img-filters');
const RERENDER_DELAY = 500;

const pictureListClear = () => {
  pictureList.querySelectorAll('.picture').forEach((item) => {
    item.remove();
  });
};

const compareFn = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getPopularPhotos = (data) => {
  const sortData = data.slice().sort(compareFn);
  pictureListClear();
  renderPack(sortData, getPictureElement, pictureList);
};

const getDefaultSortPhotos = (data) => {
  pictureListClear();
  renderPack(data, getPictureElement, pictureList);
};

const getRandomPhotos = (data) => {
  const randomData = [];
  pictureListClear();
  for (let i = 0; i < 10; i++) {
    const element = getRandomArrayElement(data);
    if (!randomData.includes(element)) {
      randomData.push(element);
    } else {
      i--;
    }
  }
  renderPack(randomData, getPictureElement, pictureList);
};

const addActiveClass = (evt) => {
  filterSort.querySelectorAll('.img-filters__button').forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });
  evt.target.closest('.img-filters__button').classList.add('img-filters__button--active');
};

const onFilterSortClickDebounce = (fn, ...args) => {
  const fnDeb = debounce(fn, RERENDER_DELAY);
  return fnDeb(...args);
};

const onFilterSortClick = (evt) => {
  if (evt.target.closest('#filter-default')) {
    addActiveClass(evt);
    onFilterSortClickDebounce(getDefaultSortPhotos, picturesData);
  } else if (evt.target.closest('#filter-random')) {
    addActiveClass(evt);
    onFilterSortClickDebounce(getRandomPhotos, picturesData);
  } else if (evt.target.closest('#filter-discussed')) {
    addActiveClass(evt);
    onFilterSortClickDebounce(getPopularPhotos, picturesData);
  }
};

filterSort.addEventListener('click', onFilterSortClick);

export {filterSort, onFilterSortClick};
