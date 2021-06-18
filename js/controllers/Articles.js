import Article from './Article.js';
import dataService from '../services/DataService.js';
import { articleView } from '../views/articleView.js';
import { articleDetailView } from '../views/articleDetailView.js';
import ArticleDetail from './ArticleDetail.js';
// const articleDetail = new ArticleDetail()

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
        const url = `http://127.0.0.1:8000/api/articles/${article.id}`;
        const response = await fetch(url)
        this.element.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = articleDetailView(article);
        this.element.appendChild(div);
        window.location.href = '/html/detail.html'
        try {
          const data = await response.json()
          const article = {
            id: data.id,
            title: data.title,
            operationType: data.operationType,
            price: data.price,
            category: data.category
          }
          return article
        } catch (error) {
          console.log(error)
        }
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
