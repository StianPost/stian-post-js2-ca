import { BASE_URL, headers } from './configs/configs.js';
import { testEmailAddress, testText } from './libs/validation.js';

import { arrayHTML } from './components/cardhtml.js';
import { bookmarkStorage } from './libs/localStorageHelpers.js';
import { filteringAnArray } from './libs/filterArray.js';
import { getAPI } from './libs/apiCalls.js';

const cardArray = await getAPI(`${BASE_URL}/articles`);

arrayHTML(cardArray, '.cardContainer');
bookmarkStorage('.fa-bookmark');

const searchBar = document.querySelector('#searchBar');
searchBar.onkeyup = function () {
  document.querySelector('.cardContainer').innerHTML = '';

  let searchResults = filteringAnArray(cardArray, this.value.trim());
  if (this.value.trim() === ``) {
    arrayHTML(cardArray, '.cardContainer');
    return;
  }
  arrayHTML(searchResults, '.cardContainer');
};
