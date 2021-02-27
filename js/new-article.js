import ShowLoading from './controllers/ShowLoading.js';
import ShowError from './controllers/ShowError.js';
import NewArticleForm from './controllers/NewArticleForm.js';


window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.lds-ring');
  new ShowLoading(loader);

  const errorsElement = document.querySelector('.global-errors');
  new ShowError(errorsElement);

  const formElement = document.querySelector('form');
  new NewArticleForm(formElement);
});
