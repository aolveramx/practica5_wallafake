import Articles from './controllers/Articles.js';
import ShowLoading from './controllers/ShowLoading.js';
import ShowError from './controllers/ShowError.js';
import NewArticleOrLogin from './controllers/NewArticleOrLogin.js';


window.addEventListener('DOMContentLoaded', async (e) => {
  const loader = document.querySelector('.lds-ring');
  new ShowLoading(loader);

  const element = document.querySelector('.article-list');
  const controller = new Articles(element);
  controller.loadArticles();

  const errorsElement = document.querySelector('.global-errors');
  new ShowError(errorsElement);

  const newArticleButtons = document.querySelector('.new-article');
  new NewArticleOrLogin(newArticleButtons);
});