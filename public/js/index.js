import '@babel/polyfill';
import { login } from './login';
import { logout } from './login';
import { displayMap } from './map';
import { updateSettings } from './updateSettings';

// Устанавливаем WebSocket соединение
// const socket = new WebSocket('ws://localhost:3001');

if (document.getElementById('map')) {
  const locations = JSON.parse(document.getElementById('map').dataset.locations);
  displayMap(locations);
}

if (document.querySelector('.form--login'))
  document.querySelector('.login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (document.querySelector('.nav__el--logout')) {
  document.querySelector('.nav__el--logout').addEventListener('click', logout);
}

if (document.querySelector('.form-user-data')) {
  document.querySelector('.form-user-data').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (document.querySelector('.form-user-settings')) {
  document.querySelector('.form-user-settings').addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (document.getElementById('book-tour')) {
  document.getElementById('book-tour').addEventListener('click', async (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    const { bookTour } = await import('./stripe');
    bookTour(tourId);
  });
}
