import Article from './Article.js';
import dataService from '../services/DataService.js';


export default class Logout extends Article {

  constructor(element) {
    super(element);
    this.checkIfUserIsLogged();
    this.attachEventListeners();
  }

  async checkIfUserIsLogged() {
    const userIsLogged = await dataService.isUserLogged();
    if (userIsLogged) {
      const logoutButton = this.element.querySelector('.logout-button');
      logoutButton.classList.remove('is-hidden');
    }
  }

  attachEventListeners() {
    this.element.addEventListener('click', async (e) => {
      e.preventDefault();
      this.publish(this.events.START_LOADING);
      try {
        await dataService.logout();
        window.location.href = '/index.html';
      } catch (error) {
        this.publish(this.events.ERROR, error)
      } finally {
        this.publish(this.events.FINISH_LOADING)
      }
    });
  }

}
