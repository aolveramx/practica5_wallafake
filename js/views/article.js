export const articleView = (article) => {
  let deleteButtonHTML = '';
  if (article.canBeDeleted) {
    deleteButtonHTML = '<button type="button" class="btn btn-danger">Borrar</button>';
  }

  return `
  <td>${article.id}</td>
  <td>${article.title}</td>
  <td>${article.operationType}</td>
  <td>${article.price}</td>
  <td>${article.category}</td>
  <td id="erase-btn">${deleteButtonHTML}</td>
  `;
  
};