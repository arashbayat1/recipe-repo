import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import SearchView from './views/searchView.js';
import ResultsView from './views/searchResultsView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';
import recipeView from './views/recipeView.js';
import { ADD_RECIPE_SUCCESS_MSEC, ADD_RECIPE_FAIL_MSEC } from './config.js';
import addRecipeView from './views/addRecipeView.js';
import ListView from './views/ListView.js';

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
  model.toggleBookmark(model.state.recipe);
  RecipeView.update(model.state.recipe);
  BookmarksView.render(model.state.favourites);
}

function handleAddShopping() {
  model.state.recipe.ingredients.forEach(ing => {
    let existsItem = model.state.shoppingList.find(
      listIng => ing.description == listIng.ingredient
    );
    if (existsItem) {
      model.updateCount(existsItem.id, existsItem.count + ing.quantity);
    } else {
      const item = model.addListItem(ing.quantity, ing.unit, ing.description);
    }
  });
  ListView.render(model.state.shoppingList);
}

function handleUpdateItemCount(id, val) {
  model.updateCount(id, val);
}

function handleDeleteShoppingItem(id) {
  model.deleteListItem(id);
  ListView.render(model.state.shoppingList);
}

function handleDeleteShoppingAll() {
  model.state.shoppingList = [];
  localStorage.removeItem('shoppingList');
  ListView.render(model.state.shoppingList);
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
      AddRecipeView.closeWindow();
    }, ADD_RECIPE_SUCCESS_MSEC);
  } catch (err) {
    AddRecipeView.renderError(err.message);
    setTimeout(function () {
      AddRecipeView.render('render');
    }, ADD_RECIPE_FAIL_MSEC);
  }
}

function init() {
  BookmarksView.HandlerRender(BookmarksView.render(model.state.favourites));
  ListView.HandlerRender(ListView.render(model.state.shoppingList));
  RecipeView.HandlerRender(handleRecipes);
  SearchView.HandlerSearch(runSearch);
  RecipeView.HandlerServingUpdate(handleServings);
  RecipeView.HandlerBookmark(handleToggleBookmark);
  RecipeView.HandlerAddShopping(handleAddShopping);
  ListView.HandlerUpdateItemCount(handleUpdateItemCount);
  ListView.HandlerDeleteShoppingItem(handleDeleteShoppingItem);
  ListView.HandlerDeleteShoppingAll(handleDeleteShoppingAll);
  AddRecipeView.HandlerToggleWindow();
  AddRecipeView.HandlerCloseWindow();
  AddRecipeView.HandlerAddRecipe(handleAddRecipe);
}
init();
