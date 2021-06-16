import ShowLoading from './controllers/ShowLoading.js';
import ShowError from './controllers/ShowError.js';
import ArticleDetail from './controllers/ArticleDetail.js';


window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.lds-ring');
  new ShowLoading(loader);

  const errorsElement = document.querySelector('.global-errors');
  new ShowError(errorsElement);

  const detailElement = document.querySelector('.jumbotron');
  new ArticleDetail(detailElement);         
});
