const ALERT_IDS = {
  SUCCESS: 'success',
  ERROR: 'error',
  DATA_ERROR: 'data-error',
};

const ALERT_GET_TIME = 5000;
const SHOW_ALERT_ERROR = 'Invalid alert ID';
const buttonClasses = ['.success__button', '.error__button'];

// Функци для получения шаблона
export const findTemplate = (id) => {
  const template = document.querySelector(`#${id}`);
  if (!template) {
    throw new Error(`Template not found: ${id}`);
  }
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Template id not a template: ${id}`);
  }
  return template.content.firstElementChild;
};

// Функци для отрисовки шаблона
export const renderPack = (items, makeElement, container) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.appendChild(makeElement(item));
  });
  container.appendChild(fragment);
};

export const clearPack = (element) => {
  element.innerHTML = '';
};

export const inputReset = (...args) => {
  args.value = '';
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

// Функции для отрисовок служебных алертов

const onBodyKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  evt.stopPropagation();
  evt.preventDefault();
  closeAlert();
};

const onAlertButtonClick = (evt) => {
  const isButtonClicked = buttonClasses.some((className) => evt.target.closest(className));
  const isInnerClicked = evt.target.closest('#alert__inner');
  if (isButtonClicked || !isInnerClicked) {
    closeAlert();
  }
};

function addAlertEventListeners(alertTemplate) {
  alertTemplate.addEventListener('click', onAlertButtonClick);
  document.body.addEventListener('keydown', onBodyKeydown);
}

function removeAlertEventListeners() {
  document.body.removeEventListener('keydown', onBodyKeydown);
}

function closeAlert () {
  const alertTemplate = document.querySelector('#alert');
  alertTemplate.remove();
  removeAlertEventListeners();
}

export function showAlert (id) {
  const alertTemplate = findTemplate(`${id}`).cloneNode(true);
  alertTemplate.id = 'alert';
  alertTemplate.firstElementChild.id = 'alert__inner';
  document.body.appendChild(alertTemplate);
  switch (id) {
    case ALERT_IDS.SUCCESS:
    case ALERT_IDS.ERROR:
      addAlertEventListeners(alertTemplate);
      break;

    case ALERT_IDS.DATA_ERROR:
      setTimeout(() => {
        alertTemplate.remove();
        removeAlertEventListeners();
      }, ALERT_GET_TIME);
      break;

    default:
      throw new Error(SHOW_ALERT_ERROR);
  }
}
