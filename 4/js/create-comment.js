import {getRandomNumberRange, getRandomArrayElement} from './get-random';

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

const commentId = getCommentId();

// Конструктор для создания комментариев
const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomNumberRange(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS_MESSAGE),
  name: getRandomArrayElement(COMMENTS_NAME),
});

export {createComment};
