const editedPicture = document.querySelector('.img-upload__preview').querySelector('img');
const effectsList = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectLevelInput = sliderContainer.querySelector('.effect-level__value');
let filterObject;

const filters = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    metrics: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    metrics: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    metrics: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    metrics: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    metrics: ''
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

function addSliderEvent () {
  sliderElement.noUiSlider.on('update', () => {
    if (!filterObject) {
      return;
    }
    effectLevelInput.value = Math.round(sliderElement.noUiSlider.get() * 10) * 0.1;
    editedPicture.style.filter = `${filterObject.filter}(${effectLevelInput.value}${filterObject.metrics})`;
  });
}

function removeSliderEvent () {
  sliderElement.noUiSlider.off('update');
}

function onFilterClick (evt) {
  const filterInput = evt.target.closest('.effects__radio');
  const name = filterInput.value;
  if (name === 'none') {
    resetFilters();
    return;
  }
  filterObject = filters[name];
  sliderContainer.classList.remove('hidden');
  updateFilter(filterObject);
}

function updateFilter (object) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: object.min,
      max: object.max,
    },
    start: object.max,
    step: object.step,
  });
}

function resetFilters () {
  editedPicture.style.filter = null;
  sliderContainer.classList.add('hidden');
}

function resetPictureStyles () {
  editedPicture.removeAttribute('style');
  filterObject = '';
  sliderContainer.classList.add('hidden');
}

export {effectsList, onFilterClick, resetPictureStyles, addSliderEvent, removeSliderEvent};
