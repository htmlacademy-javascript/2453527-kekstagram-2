import {isEscapeKey, renderPack, clearPack} from './utils.js';
import {picturesData} from './create-picture-list.js';
import {filterSort, addActiveClass} from './sort-photo.js';

const commentsRenderingInfo = {
  array: [],
  maxComments: '',
  SHOWN_STEP: 5,
  counterShownBegin: 0,
  counterShownEnd: 5,
  flag: 0
};

const postList = document.querySelector('.pictures');
const fullPost = document.querySelector('.big-picture');
const closeFullPost = document.querySelector('.big-picture__cancel');
const fullPostPhoto = fullPost.querySelector('.big-picture__img')
  .querySelector('img');
const fullPostLikes = fullPost.querySelector('.likes-count');
const fullPhotoDescription = fullPost.querySelector('.social__caption');
const fullPostTotalComments = fullPost.querySelector('.social__comment-total-count');
const fullPostShownComments = fullPost.querySelector('.social__comment-shown-count');
const commentsContainer = fullPost.querySelector('.social__comments');
const commentTemplate = fullPost.querySelector('.social__comment');
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
}

function closePost () {
  fullPost.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

function onFullPostClick() {
  closePost();
  clearPack(commentsContainer);
  filterSort.addEventListener('mouseup', addActiveClass);
  document.removeEventListener('keydown', onDocumentKeydown);
  postList.addEventListener('click', onSmallPostClick);
  removeCommentsLoaderClick();
  closeFullPost.removeEventListener('click', onFullPostClick);
}

function onSmallPostClick(evt) {
  if (evt.target.closest('.picture')) {
    openPost();
    commentsLoader.classList.remove('hidden');
    changePhotoData(evt.target.closest('.picture'), picturesData);
    filterSort.removeEventListener('mouseup', addActiveClass);
    document.addEventListener('keydown', onDocumentKeydown);
    postList.removeEventListener('click', onSmallPostClick);
    closeFullPost.addEventListener('click', onFullPostClick);
  }
}

postList.addEventListener('click', onSmallPostClick);

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

function renderFullPhoto ({comments, description, url, likes}) {
  fullPostPhoto.src = url;
  fullPostPhoto.alt = description;
  fullPostLikes.textContent = likes;
  fullPostTotalComments.textContent = comments.length;
  fullPhotoDescription.textContent = description;
}

// Реализация видимых комментариев

function renderComments(array) {
  if (!commentsRenderingInfo.flag) {
    commentsRenderingInfo.maxComments = array.length;
    commentsRenderingInfo.array = array.slice();
    clearPack(commentsContainer);
  }
  if ((commentsRenderingInfo.maxComments - commentsRenderingInfo.counterShownBegin) <= commentsRenderingInfo.SHOWN_STEP) {
    renderPack(commentsRenderingInfo.array.slice(commentsRenderingInfo.counterShownBegin, commentsRenderingInfo.maxComments), getCommentElement, commentsContainer);
    commentsLoader.classList.add('hidden');
    fullPostShownComments.textContent = commentsRenderingInfo.maxComments;
    commentsLoader.classList.add('hidden');
    removeCommentsLoaderClick();
    return;
  }
  renderPack(commentsRenderingInfo.array.slice(commentsRenderingInfo.counterShownBegin, commentsRenderingInfo.counterShownEnd), getCommentElement, commentsContainer);
  fullPostShownComments.textContent = commentsRenderingInfo.counterShownEnd.toString();
  addCommentsLoaderClick();
  commentsRenderingInfo.counterShownBegin += commentsRenderingInfo.SHOWN_STEP;
  commentsRenderingInfo.counterShownEnd += commentsRenderingInfo.SHOWN_STEP;
  commentsRenderingInfo.flag += 1;
}

const onCommentsLoaderClick = () => renderComments(commentsRenderingInfo.array);

function addCommentsLoaderClick () {
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function removeCommentsLoaderClick () {
  commentsRenderingInfo.counterShownBegin = 0;
  commentsRenderingInfo.counterShownEnd = 5;
  commentsRenderingInfo.flag = 0;
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

function changePhotoData (element, data) {
  const id = element.id;
  const array = data[id].comments;
  renderComments(array);
  renderFullPhoto(data[id]);
}

export {postList, onSmallPostClick};
