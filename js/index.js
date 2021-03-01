import Articles from './controllers/Articles.js';
import ShowLoading from './controllers/ShowLoading.js';
import ShowError from './controllers/ShowError.js';
import LoginBtn from './controllers/LoginBtn.js';
import NewArticleBtn from './controllers/NewArticleBtn.js';
import Logout from './controllers/Logout.js';


window.addEventListener('DOMContentLoaded', async (e) => {
  const loader = document.querySelector('.lds-ring');
  new ShowLoading(loader);

  const element = document.querySelector('.article-list');
  const controller = new Articles(element);
  controller.loadArticles();

  const errorsElement = document.querySelector('.global-errors');
  new ShowError(errorsElement);

  const loginButton = document.querySelector('.nav-login-article');
  new LoginBtn(loginButton);

  const articleButton = document.querySelector('.nav-login-article');
  new NewArticleBtn(articleButton);

  const logoutButton = document.querySelector('.logout');
  new Logout(logoutButton);
});