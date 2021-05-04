import icons from 'url:../../img/icons.svg';

export default class View {
  render(data) {
    if (!data || data.length == 0) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const markup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(markup);
    const newEls = Array.from(newDOM.querySelectorAll('*'));
    const currEls = Array.from(this._parentElement.querySelectorAll('*'));

    newEls.forEach((newEl, i) => {
      const currEl = currEls[i];
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attribute =>
          currEl.setAttribute(attribute.name, attribute.value)
        );
        if (newEl.firstChild?.nodeValue.trim() !== '') {
          currEl.textContent = newEl.textContent;
        }
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMsg(message = this._msg) {
    const markup = `
    <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMsg) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
