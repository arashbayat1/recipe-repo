import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './view.js';

class RecipeView extends View {
  _parentElement = $('.recipe')[0];
  _data;
  _homeButton = $('.nav__btn--home')[0];
  _errorMsg =
    "Oops! <br> We couldn't find the recipe that you're looking for. <br> Please Try Again.";
  _msg = 'Hello.';

  HandlerRender(handler) {
    // Change recipe (click and load)
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  HandlerServingUpdate(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--update-servings');
      if (button) {
        const newServings = Number(button.dataset.update);
        if (newServings >= 1) {
          handler(newServings);
        }
      }
    });
  }

  HandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--bookmark');
      if (button) {
        handler();
      }
    });
  }

  HandlerAddShopping(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.recipe_btn--add');
      if (button) {
        handler();
      }
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
     </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.favourited ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
    </ul>

    <br></br>
    <button class="btn--small recipe__btn recipe_btn--add">
     <svg class="search__icon">
        <use href="img/icons.svg#icon-shopping-cart"></use>
     </svg>
     <span>Add to shopping list</span>
    </button>
  </div>

  
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? new Fraction(parseFloat(ing.quantity)).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>
`;
  }
}

export default new RecipeView();
