import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _openButton = document.querySelector('.nav__btn--add-recipe');
  _closeButton = document.querySelector('.btn--close-modal');
  _msg = 'Successfully Added Recipe. Thank you 😊';

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  closeWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }

  HandlerToggleWindow() {
    this._openButton.addEventListener('click', this.toggleWindow.bind(this));
    this._closeButton.addEventListener('click', this.toggleWindow.bind(this));
  }

  HandlerCloseWindow() {
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }

  HandlerAddRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
