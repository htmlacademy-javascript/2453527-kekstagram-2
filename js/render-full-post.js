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
  filterSort.addEventListener('click', onFilterSortClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  postList.addEventListener('click', onSmallPostClick);
  closeFullPost.removeEventListener('click', onFullPostClick);
}

function onSmallPostClick(evt) {
  if (evt.target.closest('.picture')) {
    openPost();
    commentsLoader.classList.remove('hidden');
    changePhotoData(evt.target.closest('.picture'), picturesData);
    filterSort.removeEventListener('click', onFilterSortClick);
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

class Comments {
  constructor (array = []) {
    this.array = array;
    this.maxComments = this.array.length;
    this.SHOWN_STEP = 5;
    this.counterShownBegin = 0;
    this.counterShownEnd = 5;
  }

  renderComments() {
    clearPack(commentsContainer);
    if (this.maxComments <= this.SHOWN_STEP) {
      renderPack(this.array, getCommentElement, commentsContainer);
      commentsLoader.classList.add('hidden');
      fullPostShownComments.textContent = this.maxComments;
      return;
    }
    renderPack(this.array.slice(this.counterShownBegin, this.counterShownEnd), getCommentElement, commentsContainer);
    fullPostShownComments.textContent = this.counterShownEnd;
    this.addCommentsLoaderClick();
    this.counterShownBegin += this.SHOWN_STEP;
    this.counterShownEnd += this.SHOWN_STEP;
  }

  renderMoreComments () {
    if ((this.maxComments - this.counterShownBegin) < this.SHOWN_STEP) {
      renderPack(this.array.slice(this.counterShownBegin, this.maxComments), getCommentElement, commentsContainer);
      commentsLoader.classList.add('hidden');
      fullPostShownComments.textContent = this.maxComments;
      this.removeCommentsLoaderClick();
      return;
    }

    renderPack(this.array.slice(this.counterShownBegin, this.counterShownEnd), getCommentElement, commentsContainer);
    fullPostShownComments.textContent = this.counterShownEnd;
    this.counterShownBegin += this.SHOWN_STEP;
    this.counterShownEnd += this.SHOWN_STEP;
  }

  onCommentsLoaderClick = () => this.renderMoreComments();

  addCommentsLoaderClick () {
    commentsLoader.addEventListener('click', this.onCommentsLoaderClick);
  }

  removeCommentsLoaderClick () {
    commentsLoader.removeEventListener('click', this.onCommentsLoaderClick);
  }
}

function changePhotoData (element, data) {
  const id = element.id;
  const array = new Comments(data[id].comments);
  array.renderComments();
  renderFullPhoto(data[id]);
}

export {postList, onSmallPostClick};
