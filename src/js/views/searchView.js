class SearchView {
  _parentEl = $('.search');
  search = this._parentEl.find('.search__field')[0];

  getQuery() {
    const searchQuery = this.search.value;
    this._clearInput();
    return searchQuery;
  }

  HandlerSearch(func) {
    this._parentEl.submit(function (e) {
      e.preventDefault();
      func();
    });
  }

  _clearInput() {
    this.search.value = '';
  }
}

export default new SearchView();
