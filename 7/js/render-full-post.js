import {mocksCards} from './mocks.js';
import {isEscapeKey, renderPack} from './utils.js';
import {clearPack} from './utils.js';

const pictureCollection = document.querySelectorAll('.picture');
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
const commentTemplate = fullPost.querySelector('.social__comment');
const commentsCounter = fullPost.querySelector('.social__comment-count');
const commentsLoader = fullPost.querySelector('.comments-loader');


const onDocumentKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }

  evt.preventDefault();
  onFullPostClick();
};

function openPost () {
  fullPost.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}

function closePost () {
  fullPost.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

function onFullPostClick() {
  closePost();
  clearPack(commentsContainer);
  document.removeEventListener('keydown', onDocumentKeydown);
  postList.addEventListener('click', onClosePostClick);
  closeFullPost.removeEventListener('click', onFullPostClick);
}

function onClosePostClick(evt) {
  if (evt.target.closest('.picture')) {
    openPost();
    changePhotoData(evt.target.closest('.picture'), mocksCards);
    document.addEventListener('keydown', onDocumentKeydown);
    postList.removeEventListener('click', onClosePostClick);
    closeFullPost.addEventListener('click', onFullPostClick);
  }
}

postList.addEventListener('click', onClosePostClick);

function changePhotoData (element, mocks) {
  pictureCollection.forEach((item, index) => {
    if (element === item) {
      renderComments(mocks[index].comments);
      renderFullPhoto(mocks[index]);
    }
  });
}

const commentsListFragment = document.createDocumentFragment();

function getCommentElement ({avatar, message, name}) {
  const commentElement = commentTemplate.cloneNode(true);
  commentTemplate.querySelector('.social__picture')
    .src = avatar;
  commentTemplate.querySelector('.social__picture')
    .alt = name;
  commentTemplate.querySelector('.social__text')
    .textContent = message;
  commentsListFragment.appendChild(commentElement);

  return commentElement;
}

function renderComments (array) {
  clearPack(commentsContainer);
  renderPack(array, getCommentElement, commentsContainer);
}

function renderFullPhoto ({comments, description, url, likes}) {
  fullPostPhoto.src = url;
  fullPostPhoto.alt = description;
  fullPostLikes.textContent = likes;
  fullPostTotalComments.textContent = comments.length;
  fullPhotoDescription.textContent = description;
}

export {postList, onClosePostClick};
