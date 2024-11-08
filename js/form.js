import {isEscapeKey, inputReset} from './utils.js';
import {postList, onClosePostClick} from './render-full-post.js';

const editForm = document.querySelector('.img-upload__form');
const addNewPhotoInput = editForm.querySelector('#upload-file');
const editFormModal = editForm.querySelector('.img-upload__overlay');
const buttonCloseForm = editForm.querySelector('.img-upload__cancel');
const hashtagsInput = editForm.querySelector('.text__hashtags');
const descriptionInput = editForm.querySelector('.text__description');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;

// Валидация формы

const pristine = new Pristine(editForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
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

function onFormSubmit (evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    editForm.submit();
  }
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
  postList.removeEventListener('click', onClosePostClick);
  document.addEventListener('keydown', onDocumentKeydown);
  buttonCloseForm.addEventListener('click', onCloseButtonClick);
  addNewPhotoInput.removeEventListener('change', onInputChange);
  editForm.addEventListener('submit', onFormSubmit);
}

function onCloseButtonClick () {
  closeEditForm();
  inputReset(addNewPhotoInput, hashtagsInput, descriptionInput);
  postList.addEventListener('click', onClosePostClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonCloseForm.removeEventListener('click', onCloseButtonClick);
  addNewPhotoInput.addEventListener('change', onInputChange);
  editForm.removeEventListener('submit', onFormSubmit);
}

function openEditForm () {
  editFormModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}

function closeEditForm () {
  editFormModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

addNewPhotoInput.addEventListener('change', onInputChange);

