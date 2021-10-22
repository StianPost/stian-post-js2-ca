import { testEmailAddress, testText } from '../libs/validation.js';

import { BASE_URL } from '../configs/configs.js';
import { getUser } from '../libs/localStorageHelpers.js';

let menu = `
<nav class="navbar navbar-expand-lg navbar-light bg-light heading">
<div class="container">
  <a class="navbar-brand" href="/">News</a>
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./favorites.html">Favs</a>
      </li>
      <li class="nav-item loggedItem">
        <a class="nav-link" href="./edit.html">Edit</a>
      </li>
      <li class="nav-item loggedItem">
        <a class="nav-link" href="./create.html">Create</a>
      </li>
    </ul>
    <div class="d-flex logBTN">
      <button class="btn btn-outline-success loginBtn">Login</button>
    </div>
  </div>
</div>
</nav>`;

let modalInfo = `
<div class="modal">
<div class="modal__overlay">
    <form class="modal__form">
        <i class="fas fa-times"></i>
        <h3>Login</h3>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="formEmail" aria-describedby="emailHelp">
            <div class="form-text">We'll share your email with everyone.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="formPassword">
            <div class="form-text">We will also share your password</div>
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
</div>`;

(function () {
  if (getUser('user')) {
    document.querySelector('.header').innerHTML = menu;
    const logBtn = document.querySelector('.logBTN');
    logBtn.innerHTML = `<button class="btn btn-outline-danger logoutBtn">Logout</button>`;
    const logout = document.querySelector('.logoutBtn');
    if (logout) {
      logout.onclick = function () {
        localStorage.clear();
        window.location.href = './index.html';
      };
    }
  } else {
    document.querySelector('.header').innerHTML = menu + modalInfo;

    const logBtn = document.querySelector('.logBTN');
    logBtn.innerHTML = `<button class="btn btn-outline-success loginBtn">Login</button>`;
    document.querySelector('.loggedItem').innerHTML = '';

    const login = document.querySelector('.loginBtn');
    const modal = document.querySelector('.modal');
    login.onclick = () => {
      modal.style.display = 'block';
    };

    const closeModal = document.querySelector('.fa-times');
    closeModal.onclick = () => {
      modal.style.display = 'none';
    };

    const loginForm = document.querySelector('.modal__form');
    loginForm.onsubmit = async (event) => {
      event.preventDefault();

      const password = document.querySelector('#formPassword');
      const email = document.querySelector('#formEmail');

      if (testText(password.value, 3) && testEmailAddress(email.value)) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/local`, {
            identifier: email.value,
            password: password.value,
          });
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = './edit.html';
        } catch (error) {
          console.log('Wrong username or password');
        }
      } else {
        console.log('Incorrect Credentials');
      }
    };
  }
})();
