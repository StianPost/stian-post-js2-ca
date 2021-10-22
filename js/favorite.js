import {
  getFromLocalStorage,
  saveToLocalStorage,
} from './libs/localStorageHelpers.js';

import { arrayHTML } from './components/cardhtml.js';
import { bookmarkStorage } from './libs/localStorageHelpers.js';

const favArray = getFromLocalStorage('favourites');

arrayHTML(favArray, '.cardContainer');

if (favArray.length === 0) {
  document.querySelector('.error').innerHTML = 'Sorry, no favorites';
} else {
  document.querySelector('.error').innerHTML = '';
}

bookmarkStorage('.fa-bookmark');

const clearFavs = document.querySelector('#clearFavs');

clearFavs.onclick = () => {
  localStorage.clear('favourites');
  document.querySelector('.error').innerHTML = 'Sorry, no favorites';
  document.querySelector('.cardContainer').innerHTML = '';
};
