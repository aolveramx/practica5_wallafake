import Article from "./Article.js";
import dataService from "../services/DataService.js";
import { articleDetailView } from '../views/articleDetailView.js';

export default class ArticleDetail extends Article {

  constructor(element) {
    super(element);
    this.checkIfUserIsLogged();
    this.attachEventListener();
  }

  async checkIfUserIsLogged() {
    const userIsLogged = await dataService.isUserLogged();
    if (!userIsLogged) {
      window.location.href = '/login.html?next=/html/details.html';
    } else {
      this.publish(this.events.FINISH_LOADING);
    }
  }

  attachEventListener() {
    this.publish(this.events.START_LOADING);
    const div = document.createElement('div');
    div.innerHTML = articleDetailView(article);
    try {
      await dataService.getArticle(article);
      return 
    } catch (error) {
      this.publish(this.events.ERROR, error)
    } finally {
      this.publish(this.events.FINISH_LOADING)
    }
  }

}
