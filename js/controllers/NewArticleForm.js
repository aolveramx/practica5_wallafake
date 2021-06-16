import Article from "./Article.js";
import dataService from "../services/DataService.js";

export default class NewArticleForm extends Article {

  constructor(element) {
    super(element);
    this.checkIfUserIsLogged();
    this.attachEventListeners();
  }

  async checkIfUserIsLogged() {
    const userIsLogged = await dataService.isUserLogged();
    if (!userIsLogged) {
      window.location.href = 'html/login.html?next=/new-article.html';
    } else {
      this.publish(this.events.FINISH_LOADING);
    }
  }

  attachEventListeners() {
    this.element.addEventListener('submit', async (e) => {
      e.preventDefault();
      const article = {
        title: this.element.elements.title.value,
        operationType: this.element.elements.operationType.value,
        price: this.element.elements.price.value,
        category: this.element.elements.category.value
      }
      this.publish(this.events.START_LOADING);
      try {
        await dataService.saveArticle(article);
        window.location.href = '/?mensaje=articleOK'
      } catch (error) {
        this.publish(this.events.ERROR, error)
      } finally {
        this.publish(this.events.FINISH_LOADING)
      }
    });
  }

}
