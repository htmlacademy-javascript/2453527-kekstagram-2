import {mocksCards} from './mocks.js';
import {isEscapeKey} from './utils.js';
import {clearPack} from './utils.js';

const pictureCollection = document.getElementsByClassName('picture');
const postList = document.querySelector('.pictures');
const fullPost = document.querySelector('.big-picture');
const closeFullPost = document.querySelector('.big-picture__cancel');
const fullPostPhoto = fullPost.querySelector('.big-picture__img')
  .querySelector('img');
const fullPostLikes = fullPost.querySelector('.likes-count');
const fullPhotoDescription = fullPost.querySelector('.social__caption');
const fullPostTotalComments = fullPost.querySelector('.social__comment-total-count');
// const fullPostShownComments = fullPost.querySelector('.social__comment-shown-count');
const commentsContainer = fullPost.querySelector('.social__comments');
const commentsCounter = fullPost.querySelector('.social__comment-count');
const commentsLoader = fullPost.querySelector('.comments-loader');


const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    fullPost.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
};

function openPost () {
  fullPost.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePost () {
  fullPost.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}
postList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    openPost();
    changePhotoData(evt.target.closest('.picture'), mocksCards);
  }
});

closeFullPost.addEventListener('click', () => {
  closePost();
  clearPack(commentsContainer);
});

function changePhotoData (element, mocks) {
  for (let i = 0; i < pictureCollection.length; i++) {
    if (element === pictureCollection[i]) {
      renderComments(mocks[i].comments.length, mocks[i].comments);
      renderFullPhoto(mocks[i]);
    }
  }
}

function renderComments (amount, array) {
  let commentsListFragment = '';
  for (let i = 0; i < amount; i++) {
    // const commentTemplate = ''
    const commentElement = `<li class="social__comment">
  <img
    class="social__picture"
    src="${array[i].avatar}"
    alt="${array[i].name}"
    width="35" height="35">
  <p class="social__text">${array[i].message}</p>
</li>`;
    commentsListFragment += commentElement;
  }
  commentsContainer.innerHTML = commentsListFragment;
}

function renderFullPhoto ({comments, description, url, likes}) {
  fullPostPhoto.src = url;
  fullPostPhoto.alt = description;
  fullPostLikes.textContent = likes;
  fullPostTotalComments.textContent = comments.length;
  fullPhotoDescription.textContent = description;
}
