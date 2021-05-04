import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ListView extends View {
  _parentElement = $('.shopping__list');
  _allParentElement = $('.shopping');
  _errorMsg = 'Your list is empty. Add some tasty ingredients!';

  HandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  HandlerUpdateItemCount(handler) {
    this._parentElement.click(function (e) {
      if (
        e.target.matches('.shopping__count-value') &&
        e.target.step != 'null' &&
        e.target.value >= 0
      ) {
        handler(
          $(e.target).closest('.shopping__item').data('id'),
          Number(e.target.value)
        );
      }
    });
  }

  HandlerDeleteShoppingItem(handler) {
    this._parentElement.click(function (e) {
      if (e.target.closest('.shopping_delete, .shopping__delete *')) {
        handler($(e.target).closest('.shopping__item').data('id'));
      }
    });
  }

  HandlerDeleteShoppingAll(handler) {
    this._allParentElement.click(function (e) {
      if (e.target.closest('.btn--delete')) {
        handler();
      }
    });
  }

  _generateMarkupRecipe(ing) {
    const id = window.location.hash.slice(1);
    return `<li class="shopping__item" data-id="${ing.id}">
    <div class="shopping__count">
                <input type="number" value="${ing.count}" step="${ing.step}" class="shopping__count-value">
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
    return this._data.map(this._generateMarkupRecipe).join('');
  }
}

export default new ListView();
