import Article from "./Article.js";
import { articleDetailView } from '../views/articleDetailView.js';
import dataService from "../services/DataService.js";

export default class ArticleDetail extends Article {

  async loadArticle() {
      this.publish(this.events.START_LOADING, {});
      try {
        
      } catch (error) {
        this.publish(this.events.ERROR, error);
      } finally {
        this.publish(this.events.FINISH_LOADING, {});
      }
  }
}
