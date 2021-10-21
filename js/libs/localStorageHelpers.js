export const saveToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = function (key) {
  if (localStorage.getItem(key) !== null) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return [];
  }
};

export const getUser = function (userKey) {
  return JSON.parse(localStorage.getItem(userKey));
};

export const bookmarkStorage = function (domElm) {
  const bookmarks = document.querySelectorAll(domElm);
  bookmarks.forEach((element) => {
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
};
