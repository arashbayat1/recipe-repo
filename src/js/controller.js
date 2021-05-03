import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import SearchView from './views/searchView.js';
import ResultsView from './views/searchResultsView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';
import recipeView from './views/recipeView.js';
import { ADD_RECIPE_SUCCESS_MSEC } from './config.js';
import addRecipeView from './views/addRecipeView.js';

if (module.hot) {
  module.hot.accept();
}

const handleRecipes = async function () {
  try {
    // Find recipe & Loading Spinner

    const id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();

    ResultsView.update(model.state.search.results);
    BookmarksView.update(model.state.favourites);

    // Load Recipe
    await model.loadRecipe(id);

    // Render Recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

async function runSearch() {
  try {
    ResultsView.renderSpinner();
    const query = SearchView.getQuery();
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
  RecipeView.update(model.state.recipe);
}

function handleToggleBookmark() {
  let recipe = model.state.recipe;

  console.log(model.state.recipe.favourited);
  if (!model.state.recipe.favourited) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //model.toggleBookmark(model.state.recipe, model.state.recipe.favourited);
  console.log(model.state.recipe);
  RecipeView.update(model.state.recipe);
  BookmarksView.render(model.state.favourites);
  console.log(model.state.favourites);
}

async function handleAddRecipe(recipe) {
  try {
    AddRecipeView.renderSpinner();
    await model.addRecipe(recipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMsg();
    BookmarksView.render(model.state.favourites);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      AddRecipeView.HandlerToggleWindow();
    }, ADD_RECIPE_SUCCESS_MSEC);
  } catch (err) {
    console.log('wrong recipe', err);
    AddRecipeView.renderError(err.message);
  }
}

function init() {
  BookmarksView.HandlerRender(BookmarksView.render(model.state.favourites));
  RecipeView.HandlerRender(handleRecipes);
  SearchView.HandlerSearch(runSearch);
  RecipeView.HandlerServingUpdate(handleServings);
  RecipeView.HandlerBookmark(handleToggleBookmark);
  AddRecipeView.HandlerToggleWindow();
  AddRecipeView.HandlerCloseWindow();
  AddRecipeView.HandlerAddRecipe(handleAddRecipe);
}
init();
