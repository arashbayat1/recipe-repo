import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './view.js';

class ListView extends View {
  _parentElement = document.querySelector('.shopping__list');
  _allParentElement = document.querySelector('.shopping');
  _errorMsg = 'Your list is empty. Add some tasty ingredients!';

  HandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  HandlerDeleteShoppingItem(handler) {
    this._parentElement.addEventListener('click', function (e) {
      if (e.target.matches('.shopping_delete, .shopping__delete *')) {
        let h = e.target.closest('.shopping__item');
        console.log(h);
        console.log($(h).attr('data-id'));
        console.log(h.dataset);
        console.log($(e.target.closest('.shopping__item')).data());
        handler(e.target.closest('.shopping__item').dataset.id);
      }
    });
  }

  HandlerDeleteShoppingAll(handler) {
    this._allParentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--delete');
      if (button) {
        handler();
      }
    });
  }

  _generateMarkupRecipe(ing) {
    const id = window.location.hash.slice(1);
    console.log(id);
    return `<li class="shopping__item data-id=${ing.id}">
    <div class="shopping__count">
                <input type="number" value="${ing.count}" step="${ing.count}" class="shopping__count-value">
                <p>${ing.unit}</p>
            </div>

    <p class="shopping__description">${ing.ingredient}</p>
    <button class="shopping__delete btn--tiny">
        <svg>
            <use href="${icons}#icon-circle-with-cross"></use>
        </svg>
    </button>
</li>`;
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupRecipe).join('');
  }
}

export default new ListView();
