// Рандомайзер для чисел в диапазоне
const getRandomNumberRange = (min = 0, max = 10, stepAfterDot = 0) => {
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
const getRandomArrayElement = (elements) => elements[getRandomNumberRange(0, elements.length - 1)];

export {getRandomNumberRange, getRandomArrayElement};
