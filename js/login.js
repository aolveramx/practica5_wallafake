import ShowLoading from './controllers/ShowLoading.js';
import ShowError from './controllers/ShowError.js';
import Login from './controllers/Login.js';

window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.lds-ring');
  new ShowLoading(loader);

  const errorsElement = document.querySelector('.global-errors');
  new ShowError(errorsElement);

  const formElement = document.querySelector('form');
  new Login(formElement);
});
