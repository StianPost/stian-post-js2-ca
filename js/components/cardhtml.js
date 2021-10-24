export const arrayHTML = (array, domELM, bookClass) => {
  array.forEach(({ title, summary, id, author }) => {
    document.querySelector(domELM).innerHTML += `
        <div class="card articleCard  mt-3 col-sm-4">
            <div class="card-body articleCard__body">
                <div class="articleCard__header">
                    <h5 class="card-title">${title}</h5>
                    <i class="${bookClass} fa-bookmark bookmarkItem"
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
};
