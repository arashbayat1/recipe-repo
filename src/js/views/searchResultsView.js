import View from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = $('.results')[0];
  _msg = 'Hello.';
  _errorMsg = "Oops! We couldn't find that recipe, please search again!";

  _generateMarkupRecipe(recipe) {
    const id = window.location.hash.slice(1);
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
        <div class="preview__user-generated ${recipe.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupRecipe).join('');
  }
}

export default new ResultsView();
