import ShowLoading from './controllers/ShowLoading.js';
import ShowError from './controllers/ShowError.js';
import ArticleDetail from './controllers/ArticleDetail.js';
import Articles from './controllers/Articles.js';



window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.lds-ring');
  new ShowLoading(loader);

  const errorsElement = document.querySelector('.global-errors');
  new ShowError(errorsElement);

  const element = document.querySelector('.jumbotron');
  const controller = new Articles(element)
  // controller.loadArticle();

});
