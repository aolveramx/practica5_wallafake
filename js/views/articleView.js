export const articleView = (article) => {
  let deleteButtonHTML = '';
  let detailsButtonHTML = '';
  if (article.canBeDeleted) {
    deleteButtonHTML = '<button type="button" class="btn btn-danger">Borrar</button>';
  }
  if(article.allowView) {
    detailsButtonHTML = '<button type="button" class="btn btn-warning">Detalle</button>';
  }

  return `
  <td>${article.id}</td>
  <td>${article.title}</td>
  <td>${article.operationType}</td>
  <td>${article.price}</td>
  <td>${article.category}</td>
  <td id="details-btn">${detailsButtonHTML}</td>
  <td id="erase-btn">${deleteButtonHTML}</td>
  `;
  
};