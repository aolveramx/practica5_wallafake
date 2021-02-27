import Article from './Article.js';
import dataService from '../services/DataService.js';


export default class Register extends Article {

  constructor(element) {
    super(element);
    this.attachEventListener();
  }

  async makePost (user) {
    await dataService.registerUser(user);
    alert('Usuario creado con éxito!');
    window.location.href = '/login.html';
  }

  checkInputErrors() {
    this.element.querySelectorAll('input').forEach(input => {
        const button = this.element.querySelector('button');
        if (input.validity.valid) {
          input.classList.add('is-success');
          input.classList.remove('is-danger');
        } else {
          input.classList.remove('is-success');
          input.classList.add('is-danger');
          console.error(input.validationMessage)
        }

        if (this.element.checkValidity()) {
          button.removeAttribute('disabled');
        } else {
          button.setAttribute('disabled', true);
        }
    });
  }

attachEventListener() {

  this.element.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
      username: this.element.elements.email.value,
      password: this.element.elements.password.value
    };
    this.publish(this.events.START_LOADING);
    try {
      await this.makePost(user);
    } catch(error) {
      this.publish(this.events.ERROR, error);
    } finally {
      this.publish(this.events.FINISH_LOADING);
    }
  });

  this.element.querySelectorAll('input').forEach(input => {
    const button = this.element.querySelector('button');
    input.addEventListener('keyup', e => { 
      this.checkInputErrors();
    });
  });

    this.element.querySelectorAll('input[type="password"]').forEach(input => {
      const button = this.element.querySelector('button');
      input.addEventListener('keyup', e => { 
        const passInput = this.element.elements['password'];
        const passConfirmInput = this.element.elements['password-confirm'];
        if (passInput.value !== passConfirmInput.value) {
          passInput.setCustomValidity('El password no coindice');
          passConfirmInput.setCustomValidity('El password no coindice');
        } else {
          passInput.setCustomValidity('');
          passConfirmInput.setCustomValidity('');
        }
        this.checkInputErrors();
      });
    })

  }

}
