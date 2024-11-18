import {findTemplate} from './utils.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = findTemplate('picture');

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

export {getPictureElement, pictureList};
