const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COMMENTS_NAME = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const SIMILAR_POST_COUNT = 25;

// Рандомайзер для чисел в диапазоне
const getRandomNumberRange = (min = 0, max = 10, stepAfterDot = 0) => {
  if ((min < 0) || (max < 0) || (max === min)) {
    return 'Диапозон должен быть положительным и состоять минимум из 1 цифры';
  } else if (stepAfterDot) {
    return min < max ? (Math.round((Math.random() * (max - min) + min) * 10 ** stepAfterDot)) / (10 ** stepAfterDot) : (Math.round((Math.random() * (min - max) + max) * 10 ** stepAfterDot)) / (10 ** stepAfterDot);
  }
  return Math.round(Math.random() * (max - min) + min);
};
const getRandomArrayElemet = (elements) => elements[getRandomNumberRange(0, elements.length - 1)];

// Функции (замыкание) для создания идентификаторов
const makeCounter = function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
      return privateCounter;
    },
  };
};

// Замыкание для идентификаторая комментатора, любое без повторения
const getCommentId = () => {
  const commentIdArr = [];
  return function () {
    let currentValue = Math.floor(Math.random() * 1000);
    while (commentIdArr.includes(currentValue)) {
      currentValue = Math.floor(Math.random() * 1000);
    }
    commentIdArr.push(currentValue);
    return currentValue;
  };
};

const counterPostId = makeCounter();
const counterPostUrl = makeCounter();
const commentId = getCommentId();

// Конструктор для создания комментариев
const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomNumberRange(1,6)}.svg`,
  message: getRandomArrayElemet(COMMENTS_MESSAGE),
  name: getRandomArrayElemet(COMMENTS_NAME),
});

// Конструктор для создания постов
const createPost = () => ({
  id: counterPostId.increment(),
  url: `photos/${counterPostUrl.increment()}.jpg`,
  description: 'some description',
  likes: getRandomNumberRange(15, 200),
  similarComments: Array.from({length: getRandomNumberRange(0,30)}, createComment),
});

const similarPosts = Array.from({length: SIMILAR_POST_COUNT}, createPost);
window.console.log(similarPosts);
