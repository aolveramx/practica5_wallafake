import Article from './Article.js';
import dataService from '../services/DataService.js';
import { articleView } from '../views/articleView.js';

export default class Articles extends Article {

  render(articles) {
    this.element.innerHTML = '';
    for (const article of articles) {
      const row = document.createElement('tr');
      row.innerHTML = articleView(article);
      const deleteButton = row.querySelector('#erase-btn');
      const detailsButton = row.querySelector('#details-btn');
      if (deleteButton) {
        deleteButton.addEventListener('click', async (e) => {
          const deleteConfirmed = confirm('¿Seguro que quieres borrarlo?');
          if (deleteConfirmed) {
            await dataService.deleteArticle(article);
            row.remove();
            await this.loadArticles();
          }
        });
      }
      detailsButton.addEventListener('click', async (e) => {
        await dataService.getArticle(article);
      });
      this.element.appendChild(row);
    }
  }

  async loadArticles() {
      this.publish(this.events.START_LOADING, {});
      try {
        const articles = await dataService.getArticles();
        this.render(articles);
      } catch (error) {
        console.error(error);
        this.publish(this.events.ERROR, error);
      } finally {
        this.publish(this.events.FINISH_LOADING, {});
      }
  }

}
