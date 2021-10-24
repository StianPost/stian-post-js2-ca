import alert from './components/alert.js';
import { BASE_URL, headers } from './configs/configs.js';

let articleForm = document.querySelector('.form');

articleForm.onsubmit = async function (event) {
  event.preventDefault();
  const title = document.querySelector('#title');
  const summary = document.querySelector('#summary');
  const author = document.querySelector('#author');

  try {
    let newArticle = {
      title: title.value,
      summary: summary.value,
      author: author.value,
    };

    let response = await axios.post(
      `${BASE_URL}/articles`,
      newArticle,
      headers
    );
    alert('alert-success', 'Article has been created');

    title.value = '';
    summary.value = '';
    author.value = '';
  } catch (error) {
    alert('alert-danger', 'An error occured, article not created');
  }
};
