const ALERT_GET_TIME = 5000;
const SHOW_ALERT_ERROR = 'id не найден';

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

const onDocumentKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  evt.stopPropagation();
  evt.preventDefault();
  closeAlert();
};

const onAlertButtonClick = (evt) => {
  if (evt.target.closest('.success__button') || evt.target.closest('.error__button') || !evt.target.closest('#alert__inner')) {
    closeAlert();
  }
};

function closeAlert () {
  const alertTemplate = document.querySelector('#alert');
  alertTemplate.remove();
  document.body.removeEventListener('keydown', onDocumentKeydown);
}

export function showAlert (id) {
  const alertTemplate = findTemplate(`${id}`).cloneNode(true);
  alertTemplate.id = 'alert';
  alertTemplate.firstElementChild.id = 'alert__inner';
  document.body.appendChild(alertTemplate);
  if (id === 'success' || id === 'error') {
    alertTemplate.addEventListener('click', onAlertButtonClick);
    document.body.addEventListener('keydown', onDocumentKeydown);
  } else if (id === 'data-error') {
    setTimeout(() => {
      alertTemplate.remove();
    }, ALERT_GET_TIME);
  } else {
    throw new Error(SHOW_ALERT_ERROR);
  }
}
