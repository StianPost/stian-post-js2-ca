import { BASE_URL, headers } from './configs/configs.js';

async function getCarsAndDeleteACar() {
  let { data } = await axios.get(`${BASE_URL}/articles`);

  let table = document.querySelector('.tableBody');
  table.innerHTML = '';

  data.forEach(({ id, title }) => {
    table.innerHTML += `<tr>
				<th scope="row">${id}</th>
				<td>${title}</td>
				<td>
					<a href="editArticle.html?id=${id}"><i class="far fa-edit"></i></></a>
				</td>
				<td>
					<i class="far fa-trash-alt" data-id=${id}></i>
				</td>
			</tr>`;
  });

  // Add a click event on each of the buttons
  let deleteBtn = document.querySelectorAll('.fa-trash-alt');
  console.log(deleteButtons);

  deleteBtn.forEach((deleteButton) => {
    deleteButton.onclick = async () => {
      let { data } = await axios.delete(
        `${BASE_URL}/articles/${deleteButton.dataset.id}`,
        headers
      );

      getCarsAndDeleteACar();
    };
  });
}

getCarsAndDeleteACar();
