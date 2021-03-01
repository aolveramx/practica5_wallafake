import Article from './Article.js';
import dataService from '../services/DataService.js';


export default class LoginBtn extends Article {

  constructor(element) {
    super(element);
    this.checkIfUserIsLogged();
  }

  async checkIfUserIsLogged() {
    const userIsLogged = await dataService.isUserLogged();
    if (!userIsLogged) {
      const loginButton = this.element.querySelector('.login-register-buttons');
      loginButton.classList.remove('is-hidden');
    }
  }

}
