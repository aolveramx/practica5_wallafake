
export const articleDetailView = (article) => {
  return `
  <h1 class="display-4">${article.title}</h1>
  <span class="badge badge-success">${article.operationType}</span>
  <p class="lead">${article.price}</p>

  <span class="badge badge-pill badge-info">${article.category}</span>

  <small>${article.id}</small>

  <hr class="my-4">
  <p>Los mejores tratos estan en <strong>WallaFake</strong></p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="/index.html" role="button">Mas anuncios</a>
  </p>
  `;
};