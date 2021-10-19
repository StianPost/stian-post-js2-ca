import {
  getFromLocalStorage,
  saveToLocalStorage,
} from './libs/localStorageHelpers.js';

const favArray = getFromLocalStorage('favourites');

favArray.forEach((element) => {
  console.log(element);
});
