import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import ResultsView from './views/searchResultsView.js';

if (module.hot) {
  module.hot.accept();
}

const handleRecipes = async function () {
  try {
    // Find recipe & Loading Spinner

    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    ResultsView.update(model.state.search.results);

    // Load Recipe
    await model.loadRecipe(id);

    // Render Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

async function runSearch() {
  try {
    ResultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) {
      return;
    }

    await model.loadSearch(query);
    console.log(model.state.search.results);
    ResultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
}

function handleServings(servings) {
  model.updateServings(servings);
  recipeView.update(model.state.recipe);
}

function init() {
  recipeView.addHandlerRender(handleRecipes);
  searchView.addHandlerSearch(runSearch);
  recipeView.addHandlerServingUpdate(handleServings);
}
init();
