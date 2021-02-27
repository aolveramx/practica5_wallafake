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
      newArticleButton.classList.remove('visually-hidden');
 
    } else {
      const loginRegisterButtons = this.element.querySelector('.login-register-buttons');
      loginRegisterButtons.classList.remove('visually-hidden');
    }
  }

}
