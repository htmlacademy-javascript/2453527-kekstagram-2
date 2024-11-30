const MAX_SCALE_VALUE = '100%';
const MIN_SCALE_VALUE = '25%';
const SCALE_STEP = 25;

const editedPicture = document.querySelector('.img-upload__preview').querySelector('img');
const scaleContainer = document.querySelector('.scale');
const scaleButtonSmaller = scaleContainer.querySelector('.scale__control--smaller');
const scaleButtonBigger = scaleContainer.querySelector('.scale__control--bigger');
const scaleInput = scaleContainer.querySelector('.scale__control--value');

const changeScale = (button) => {
  const value = parseInt(scaleInput.value, 10);
  if ((scaleInput.value === MAX_SCALE_VALUE && button === scaleButtonBigger) || (scaleInput.value === MIN_SCALE_VALUE && button === scaleButtonSmaller)) {
    return;
  }
  if (button === scaleButtonBigger) {
    scaleInput.value = `${value + SCALE_STEP}%`;
  } else {
    scaleInput.value = `${value - SCALE_STEP}%`;
  }

  editedPicture.style.transform = `scale(${scaleInput.value})`;
};

const onScaleButtonsClick = (evt) => {
  if (evt.target.closest('.scale__control--smaller')) {
    changeScale(scaleButtonSmaller);
  } else if (evt.target.closest('.scale__control--bigger')) {
    changeScale(scaleButtonBigger);
  }
};

export {scaleContainer, onScaleButtonsClick, scaleInput, MAX_SCALE_VALUE};
