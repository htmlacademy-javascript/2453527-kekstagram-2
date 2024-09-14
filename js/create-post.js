import {getRandomNumberRange} from './get-random';
import {createComment} from './create-comment';

// Функции (замыкание) для создания идентификаторов
const makeCounter = function () {
  let value = 0;
  return {
    increment: function () {
      return ++value;
    },
  };
};

const counterPostId = makeCounter();
const counterPostUrl = makeCounter();


// Конструктор для создания постов
const createPost = () => ({
  id: counterPostId.increment(),
  url: `photos/${counterPostUrl.increment()}.jpg`,
  description: 'some description',
  likes: getRandomNumberRange(15, 200),
  similarComments: Array.from({length: getRandomNumberRange(0, 30)}, createComment),
});

export {createPost};
