import Article from './Article.js';
import dataService from '../services/DataService.js';


export default class NewArticleOrLogin extends Article {

  constructor(element) {
    super(element);
    this.checkIfUserIsLogged();
  }

  async checkIfUserIsLogged() {
    const userIsLogged = await dataService.isUserLogged();
    if (userIsLogged) {
      const newArticleButton = this.element.querySelector('.new-article-button');
      newArticleButton.classList.remove('is-hidden');
    } else {
      const loginButton = this.element.querySelector('.login-button');
      loginButton.classList.remove('is-hidden');
    }
  }

}
