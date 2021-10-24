import { BASE_URL, headers } from './configs/configs.js';

async function editArticles() {
  let { data } = await axios.get(`${BASE_URL}/articles`);

  let table = document.querySelector('.tableBody');
  table.innerHTML = '';

  data.forEach(({ id, title }) => {
    table.innerHTML += `
      <tr>
				<th scope="row">${id}</th>
				<td>${title}</td>
				<td>
					<a href="editArticle.html?id=${id}"><i class="far fa-edit"></i></></a>
				</td>
				<td>
					<i class="far deleteBtn fa-trash-alt" data-id=${id}></i>
				</td>
			</tr>`;
  });

  let deleteBtn = document.querySelectorAll('.deleteBtn');
  deleteBtn.forEach((deleteButton) => {
    deleteButton.onclick = async () => {
      let deleteArticle = confirm('are you sure you want to delete?');
      if (deleteArticle) {
        let { data } = await axios.delete(
          `${BASE_URL}/articles/${deleteButton.dataset.id}`,
          headers
        );
        editArticles();
      }
    };
  });
}

editArticles();
