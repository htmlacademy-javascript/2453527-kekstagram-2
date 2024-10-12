import {createPost} from './mocks.js';
import {renderPack} from './utils.js';
import {getPictureElement, pictureList} from './create-elements.js';

const SIMILAR_POST_COUNT = 25;
const mocksCards = Array.from({length: SIMILAR_POST_COUNT}, createPost);
renderPack(mocksCards, getPictureElement, pictureList);
