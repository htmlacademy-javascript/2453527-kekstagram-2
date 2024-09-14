import {createPost} from './create-post';

const SIMILAR_POST_COUNT = 25;

window.console.log(Array.from({length: SIMILAR_POST_COUNT}, createPost));
