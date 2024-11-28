import {getData} from './api.js';
import {findTemplate, renderPack, showAlert} from './utils.js';
import {filterSort, addFilterEventListeners} from './sort-photo.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = findTemplate('picture');

let picturesData;

const pictureListFragment = document.createDocumentFragment();

// Функция, создающая картинку
const getPictureElement = ({id, url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.setAttribute('id', id);
  pictureElement.querySelector('.picture__img')
    .setAttribute('src', url);
  pictureElement.querySelector('.picture__img')
    .setAttribute('alt', description);
  pictureElement.querySelector('.picture__comments')
    .textContent = comments.length;
  pictureElement.querySelector('.picture__likes')
    .textContent = likes;
  pictureListFragment.appendChild(pictureElement);

  return pictureElement;
};

getData()
  .then((photos) => {
    picturesData = photos;
    renderPack(picturesData, getPictureElement, pictureList);
    filterSort.classList.remove('img-filters--inactive');
    addFilterEventListeners();
  })
  .catch(() => {
    showAlert('data-error');
  });

export {picturesData, pictureList, getPictureElement};
