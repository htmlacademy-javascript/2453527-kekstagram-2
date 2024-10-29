// Рандомайзер для чисел в диапазоне
export const getRandomNumberRange = (min = 0, max = 10, stepAfterDot = 0) => {
  if ((min < 0) || (max < 0) || (max === min)) {
    window.console.warn('Диапозон должен быть положительным и состоять минимум из 1 цифры');
    return 0;
  } else if (stepAfterDot) {
    const a = (Math.round((Math.random() * (max - min) + min) * 10 ** stepAfterDot)) / (10 ** stepAfterDot);
    const b = (Math.round((Math.random() * (min - max) + max) * 10 ** stepAfterDot)) / (10 ** stepAfterDot);
    return min < max ? a : b;
  }
  return Math.round(Math.random() * (max - min) + min);
};
export const getRandomArrayElement = (elements) => elements[getRandomNumberRange(0, elements.length - 1)];

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

export const isEscapeKey = (evt) => evt.key === 'Escape';
