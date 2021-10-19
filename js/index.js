import { BASE_URL, headers } from './configs/configs.js';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from './libs/localStorageHelpers.js';
import { testEmailAddress, testText } from './libs/validation.js';

import { getAPI } from './libs/apiCalls.js';

const cardArray = await getAPI();
let cardContainer = document.querySelector('.cardContainer');
cardContainer.innerHTML = '';

cardArray.forEach(({ title, summary, id, author }) => {
  cardContainer.innerHTML += `
    <div class="card articleCard  mt-3 col-sm-4">
        <div class="card-body articleCard__body">
            <div class="articleCard__header">
                <h5 class="card-title">${title}</h5>
                <i class="far fa-bookmark"
                    data-id="${id}" 
                    data-author="${author}" 
                    data-title="${title}"
                    data-summary="${summary}">
                </i>
            </div>
            <p class="card-text">${summary}</p>
            <footer class="blockquote-footer">${author}</footer>
        </div>
    </div>`;
});

const bookmarkClass = document.querySelectorAll('.fa-bookmark');

bookmarkClass.forEach((element) => {
  element.onclick = () => {
    element.classList.toggle('far');
    element.classList.toggle('fas');

    let localStorageObject = {
      id: element.dataset.id,
      author: element.dataset.author,
      title: element.dataset.title,
      summary: element.dataset.summary,
    };

    let favourites = getFromLocalStorage('favourites');

    let isInStorage = favourites.find(
      (productObject) => productObject.id === localStorageObject.id
    );

    if (isInStorage === undefined) {
      favourites.push(localStorageObject);
      saveToLocalStorage('favourites', favourites);
    } else {
      let removedElementArray = favourites.filter(
        (productObject) => productObject.id !== localStorageObject.id
      );
      saveToLocalStorage('favourites', removedElementArray);
    }
  };
});
