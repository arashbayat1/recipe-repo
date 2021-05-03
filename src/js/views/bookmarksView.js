import View from './view.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.favourites__list');
  _errorMsg = 'No bookmarks yet. Find a new recipe to add!';

  HandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkupRecipe(recipe) {
    const id = window.location.hash.slice(1);
    console.log(id);
    return `<li class="preview">
    <a class="preview__link ${
      id == recipe.id ? 'preview__link--active' : ''
    }" href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        
      </div>
    </a>
  </li>`;
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupRecipe).join('');
  }
}

export default new BookmarksView();