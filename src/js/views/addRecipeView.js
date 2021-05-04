import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = $('.upload')[0];
  _window = $('.add-recipe-window')[0];
  _overlay = $('.overlay')[0];
  _openButton = $('.nav__btn--add-recipe')[0];
  _closeButton = $('.btn--close-modal')[0];
  _msg = 'Successfully Added Recipe. Redirecting now, Thank you! 😊';

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

  _generateMarkup() {
    return `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="Testyy" id="data" required name="title" type="text" />

    <label>URL</label>
    <input
      value="Testyy"
      id="data"
      required
      name="sourceUrl"
      type="text"
    />

    <label>Image URL</label>
    <input value="Testyy" id="data" required name="image" type="text" />

    <label>Publisher</label>
    <input
      value="Testyy"
      id="data"
      required
      name="publisher"
      type="text"
    />

    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />

    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <div class="inputs">
      <input
        value="0.5,kg,Rice"
        id="small"
        type="number"
        name="ingredient-1-qty"
        placeholder="QTY"
      />
      <input
        id="small"
        type="text"
        name="ingredient-1-unit"
        placeholder="Unit"
      />
      <input type="text" name="ingredient-1" placeholder="Ingredient" />
    </div>

    <label>Ingredient 2</label>
    <div class="inputs">
      <input
        id="small"
        value="1,,Avocado"
        type="number"
        name="ingredient-2-qty"
        placeholder="QTY"
      />
      <input
        id="small"
        type="text"
        name="ingredient-2-unit"
        placeholder="Unit"
      />
      <input type="text" name="ingredient-2" placeholder="Ingredient" />
    </div>

    <label>Ingredient 3</label>
    <div class="inputs">
      <input
        id="small"
        value=",,salt"
        type="number"
        name="ingredient-3-qty"
        placeholder="QTY"
      />
      <input
        id="small"
        type="text"
        name="ingredient-3-unit"
        placeholder="Unit"
      />
      <input type="text" name="ingredient-3" placeholder="Ingredient" />
    </div>

    <label>Ingredient 4</label>
    <div class="inputs">
      <input
        id="small"
        type="number"
        name="ingredient-4-qty"
        placeholder="QTY"
      />
      <input
        id="small"
        type="text"
        name="ingredient-4-unit"
        placeholder="Unit"
      />
      <input type="text" name="ingredient-4" placeholder="Ingredient" />
    </div>

    <label>Ingredient 5</label>
    <div class="inputs">
      <input
        id="small"
        type="number"
        name="ingredient-5-qty"
        placeholder="QTY"
      />
      <input
        id="small"
        type="text"
        name="ingredient-5-unit"
        placeholder="Unit"
      />
      <input type="text" name="ingredient-5" placeholder="Ingredient" />
    </div>

    <label>Ingredient 6</label>
    <div class="inputs">
      <input
        id="small"
        type="number"
        name="ingredient-6-qty"
        placeholder="QTY"
      />
      <input
        id="small"
        type="text"
        name="ingredient-6-unit"
        placeholder="Unit"
      />
      <input type="text" name="ingredient-6" placeholder="Ingredient" />
    </div>
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="${icons}#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }
}

export default new AddRecipeView();
