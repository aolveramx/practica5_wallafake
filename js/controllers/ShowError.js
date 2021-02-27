import Article from './Article.js';
import { errorView } from '../views/error.js';

export default class ShowError extends Article {

  constructor(element) {
    super(element);
    this.subscribe(this.events.ERROR, (error) => {
      this.showError(error);
    });
  }

  showError(errorMessage) {
    this.element.innerHTML = errorView(errorMessage);
    this.element.classList.remove('hidden');
    this.element.addEventListener('click', (event) => {
      if (event.target == this.element || event.target.classList.contains('delete')) {
        this.element.classList.add('hidden');
      }
    })
  }

}
