import {isEscapeKey, inputReset, showAlert} from './utils.js';
import {postList, onSmallPostClick} from './render-full-post.js';
import {scaleContainer, onScaleButtonsClick} from './scale-editor.js';
import {
  effectsList,
  onFilterClick,
  resetPictureStyles,
  addSliderEvent,
  removeSliderEvent,
} from './filter-editor.js';
import {sendData} from './api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const editForm = document.querySelector('.img-upload__form');
const addNewPhotoInput = editForm.querySelector('#upload-file');
const editFormModal = editForm.querySelector('.img-upload__overlay');
const buttonCloseForm = editForm.querySelector('.img-upload__cancel');
const submitButton = editForm.querySelector('.img-upload__submit');
const hashtagsInput = editForm.querySelector('.text__hashtags');
const descriptionInput = editForm.querySelector('.text__description');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;

// Валидация формы

const pristine = new Pristine(editForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

function validateHashtag (value) {
  const valueArr = value.trim().toLowerCase().split(' ');
  if (valueArr.length > MAX_HASHTAGS_LENGTH) {
    return false;
  }
  for (let i = 0; i < valueArr.length; i++) {
    if (!hashtag.test(valueArr[i]) && value.length !== 0) {
      return false;
    }
    for (let k = i + 1; k < valueArr.length; k++) {
      if (valueArr[i] === valueArr[k] && i !== k) {
        return false;
      }
    }
  }
  return true;
}

function getHashtagErrorMessage (value) {
  const valueArr = value.trim().toLowerCase().split(' ');
  if (valueArr.length > MAX_HASHTAGS_LENGTH) {
    return 'Превышено количество хэштегов';
  }
  for (let i = 0; i < valueArr.length; i++) {
    if (!hashtag.test(valueArr[i]) && value.length !== 0) {
      return 'Введён невалидный хэштег';
    }
    for (let k = i + 1; k < valueArr.length; k++) {
      if (valueArr[i] === valueArr[k] && i !== k) {
        return 'Хэштеги повторяются';
      }
    }
  }
  return true;
}

function validateDescription (value) {
  return !(value.length > MAX_DESCRIPTION_LENGTH);
}

pristine.addValidator(hashtagsInput, validateHashtag, getHashtagErrorMessage);
pristine.addValidator(descriptionInput, validateDescription, 'Длина комментария больше 140 символов');

// Обработка отправки формы

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

function sendEditForm (formElement) {
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(formElement);
    sendData(formData)
      .then(closeEditForm)
      .then(() => {
        showAlert('success');
      })
      .catch(() => {
        showAlert('error');
      })
      .finally(unBlockSubmitButton);
  }
}

function onEditFormSubmit (evt) {
  evt.preventDefault();
  sendEditForm(evt.target);
}

// Реализация открытия/закрытия, добавление/удаление обработчиков
const onDocumentKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  if (document.activeElement === hashtagsInput || document.activeElement === descriptionInput) {
    evt.stopPropagation();
  } else {
    evt.preventDefault();
    onCloseButtonClick();
  }
};

function onInputChange () {
  openEditForm();
}

function onCloseButtonClick () {
  closeEditForm();
}

function openEditForm () {
  editFormModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  postList.removeEventListener('click', onSmallPostClick);
  document.addEventListener('keydown', onDocumentKeydown);
  buttonCloseForm.addEventListener('click', onCloseButtonClick);
  addNewPhotoInput.removeEventListener('change', onInputChange);
  editForm.addEventListener('submit', onEditFormSubmit);
  scaleContainer.addEventListener('click', onScaleButtonsClick);
  effectsList.addEventListener('change', onFilterClick);
  addSliderEvent();
}

function closeEditForm () {
  editFormModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  inputReset(addNewPhotoInput, hashtagsInput, descriptionInput);
  postList.addEventListener('click', onSmallPostClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonCloseForm.removeEventListener('click', onCloseButtonClick);
  addNewPhotoInput.addEventListener('change', onInputChange);
  scaleContainer.removeEventListener('click', onScaleButtonsClick);
  effectsList.removeEventListener('change', onFilterClick);
  removeSliderEvent();
  resetPictureStyles();
  editForm.removeEventListener('submit', onEditFormSubmit);
}

addNewPhotoInput.addEventListener('change', onInputChange);
