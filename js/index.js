import { BASE_URL, headers } from './configs/configs.js';
import { arrayHTML } from './components/cardhtml.js';
import { bookmarkStorage } from './libs/localStorageHelpers.js';
import { filteringAnArray } from './libs/filterArray.js';
import { getAPI } from './libs/apiCalls.js';

const cardArray = await getAPI(`${BASE_URL}/articles`);
if (cardArray) {
  document.querySelector('.loading').innerHTML = '';
}
arrayHTML(cardArray, '.cardContainer', 'far');
bookmarkStorage('.fa-bookmark');

const searchBar = document.querySelector('#searchBar');
searchBar.onkeyup = function () {
  document.querySelector('.cardContainer').innerHTML = '';

  let searchResults = filteringAnArray(cardArray, this.value.trim());
  if (searchResults.length === 0) {
    document.querySelector('.error').innerHTML = 'Sorry, no matching items';
  } else {
    document.querySelector('.error').innerHTML = '';
  }
  if (this.value.trim() === ``) {
    arrayHTML(cardArray, '.cardContainer', 'far');
    bookmarkStorage('.fa-bookmark');
    return;
  }
  arrayHTML(searchResults, '.cardContainer', 'far');
  bookmarkStorage('.fa-bookmark');
};
