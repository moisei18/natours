/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { logout } from './login';
import { displayMap } from './map';
import { updateData } from './updateSettings';

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

// document.querySelector('.btn--save-settings').addEventListener('click', updateData);
