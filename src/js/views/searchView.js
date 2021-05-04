class SearchView {
  _parentEl = $('.search')[0];

  getQuery() {
    const searchQuery = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return searchQuery;
  }

  HandlerSearch(func) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      func();
    });
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
