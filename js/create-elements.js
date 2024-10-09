import {createPosts} from './mocks';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureElements = createPosts();
const pictureListFragment = document.createDocumentFragment();

// Создаем объект и меняем данные внутри, складываем все в один элемент

pictureElements.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img')
    .setAttribute('src', url);
  pictureElement.querySelector('.picture__img')
    .setAttribute('alt', description);
  pictureElement.querySelector('.picture__comments')
    .textContent = comments.length;
  pictureElement.querySelector('.picture__likes')
    .textContent = likes;
  pictureListFragment.appendChild(pictureElement);
});

// Добавление элемента на страницу

pictureList.appendChild(pictureListFragment);
