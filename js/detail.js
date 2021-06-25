import ShowLoading from './controllers/ShowLoading.js';
import ShowError from './controllers/ShowError.js';
import Articles from './controllers/Articles.js';
import { articleDetailView } from './views/articleDetailView.js';


window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.lds-ring');
  new ShowLoading(loader);

  const errorsElement = document.querySelector('.global-errors');
  new ShowError(errorsElement);

  const element = document.querySelector('.jumbotron');
  const controller = new Articles(element)

  let currentUrl = window.location.href
  let url = new URL(currentUrl);
  let detailId = url.searchParams.get("id");
  loadArticle(detailId)
});

async function loadArticle(detailId) {
  const urlDetail = `http://127.0.0.1:8000/api/articles/${detailId}`;
  const response = await fetch(urlDetail)
  const jumbotron = document.querySelector('.jumbotron');
  try {
    const data = await response.json()
    const article = {
      id: data.id,
      title: data.title.replace(/(<([^>]+)>)/gi, ""),
      operationType: data.operationType,
      price: data.price.toString().replace(/(<([^>]+)>)/gi) || [],
      category: data.category
    }

    const information = articleDetailView(article);
    jumbotron.innerHTML = information;

  } catch (error) {
    console.log(error)
  }
}