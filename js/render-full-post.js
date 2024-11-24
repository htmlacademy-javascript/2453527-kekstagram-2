import {isEscapeKey, renderPack, clearPack} from './utils.js';
import {picturesData} from './create-picture-list.js';
import {filterSort, onFilterSortClick} from './sort-photo.js';

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
  filterSort.addEventListener('click', onFilterSortClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  postList.addEventListener('click', onSmallPostClick);
  closeFullPost.removeEventListener('click', onFullPostClick);
}

function onSmallPostClick(evt) {
  if (evt.target.closest('.picture')) {
    openPost();
    changePhotoData(evt.target.closest('.picture'), picturesData);
    filterSort.removeEventListener('click', onFilterSortClick);
    document.addEventListener('keydown', onDocumentKeydown);
    postList.removeEventListener('click', onSmallPostClick);
    closeFullPost.addEventListener('click', onFullPostClick);
  }
}

postList.addEventListener('click', onSmallPostClick);
function changePhotoData (element, data) {
  const id = element.id;
  renderComments(data[id].comments);
  renderFullPhoto(data[id]);
}

const commentsListFragment = document.createDocumentFragment();

function getCommentElement ({avatar, message, name}) {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture')
    .src = avatar;
  commentElement.querySelector('.social__picture')
    .alt = name;
  commentElement.querySelector('.social__text')
    .textContent = message;
  commentsListFragment.appendChild(commentElement);

  return commentsListFragment;
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

export {postList, onSmallPostClick};
