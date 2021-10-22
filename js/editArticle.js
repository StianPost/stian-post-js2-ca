import { BASE_URL, headers } from './configs/configs.js';

import { getAPI } from './libs/apiCalls.js';

// import alert from './components/alert.js';

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

let title = document.querySelector('#title');
let summary = document.querySelector('#summary');
const form = document.querySelector('.form');

const articleArray = await getAPI(`${BASE_URL}/articles/${id}`);

title.value = articleArray.title;
summary.value = articleArray.summary;

form.onsubmit = async function (event) {
  event.preventDefault();
  let updatedCar = {
    title: title.value,
    summary: summary.value,
  };

  const response = await axios.put(
    `${BASE_URL}/articles/${id}`,
    updatedCar,
    headers
  );

  console.log(response);
  console.log('Ey it worked');
};
