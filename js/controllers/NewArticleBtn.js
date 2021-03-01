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
      const articleButton = this.element.querySelector('.new-article-button');
      articleButton.classList.remove('is-hidden');
    }
  }

}
