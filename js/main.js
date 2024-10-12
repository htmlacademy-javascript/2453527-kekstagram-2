import {createPost} from './mocks';
import {renderPack} from './utils';
import {getPictureElement, pictureList} from './create-elements';

const SIMILAR_POST_COUNT = 25;
const mocksCards = Array.from({length: SIMILAR_POST_COUNT}, createPost);
renderPack(mocksCards, getPictureElement, pictureList);
