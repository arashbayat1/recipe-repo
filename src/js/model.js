import { json } from 'body-parser';
import { API_URL, API_KEY } from './config';
import { getJSON, postJSON } from './helpers';
import uniqid from 'uniqid';
import { model } from 'mongoose';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
  favourites: [],
  shoppingList: [],
};

function createNewRecipe(data) {
  const { recipe } = data.data;
  let recipeData = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  };
  if (recipe.key) {
    recipeData.key = recipe.key;
  }
  return recipeData;
}

export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createNewRecipe(data);

    if (state.favourites.some(favourite => id == favourite.id)) {
      state.recipe.favourited = true;
    } else {
      state.recipe.favourited = false;
    }
  } catch (err) {
    // Error handling
    console.error(`${err} bppl`);
    throw err;
  }
}

export async function loadSearch(query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
    console.log(data);

    state.search.results = data.data.recipes.map(recipe => {
      let searchResult = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
      if (recipe.key) {
        searchResult.key = recipe.key;
      }
      return searchResult;
    });
  } catch (err) {
    console.error(`${err} boom`);
    throw err;
  }
}

export function updateServings(servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (servings / state.recipe.servings);
  });
  state.recipe.servings = servings;
}

// export function toggleBookmark(recipe, bool) {
//   console.log(2222);
//   console.log(recipe);
//   if (bool) {
//     const idx = state.favourites.findIndex(
//       favourite => (favourite.id = recipe.id)
//     );
//     recipe.favourited = false;
//     state.favourites.splice(idx, 1);
//   } else {
//     state.favourites.push(recipe);
//     recipe.favourited = true;
//   }
//   localStorage.setItem('favourites', JSON.stringify(state.favourites));
// }

export function addBookmark(recipe) {
  state.recipe.favourited = true;
  state.favourites.push(recipe);
  localStorage.setItem('favourites', JSON.stringify(state.favourites));
}

export function deleteBookmark(id) {
  state.recipe.favourited = false;
  let idx = state.favourites.findIndex(el => el.id === id);
  state.favourites.splice(idx, 1);
  localStorage.setItem('favourites', JSON.stringify(state.favourites));
}

export async function addRecipe(recipe) {
  try {
    const ings = Object.entries(recipe).filter(data =>
      data[0].startsWith('ingredient')
    );
    let ingredients = [];
    if (ings[2][1] == '') {
      throw new Error('Oops! Make sure to add an ingredient!');
    }
    for (let i = 0; i < ings.length - 1; i += 3) {
      if (ings[i + 2][1] == '') {
        if (ings[i][1] != '' || ings[i + 1][1] != '') {
          throw new Error('Oops! Make sure to add the ingredient itself!');
        }
        continue;
      } else if (Number(ings[i][1]) < 0) {
        throw new Error("Oops! You can't have negative ingredients!");
      }
      ings[i][1] = ings[i][1].replaceAll(' ', '');
      ingredients.push({
        quantity: ings[i][1] != '' ? Number(ings[i][1]) : null,
        unit: ings[i + 1][1].replaceAll(' ', ''),
        description: ings[i + 2][1],
      });
    }
    const newRecipe = {
      title: recipe.title,
      source_url: recipe.sourceUrl,
      image_url: recipe.image,
      publisher: recipe.publisher,
      cooking_time: Number(recipe.cookingTime),
      servings: Number(recipe.servings),
      ingredients,
    };
    const data = await postJSON(`${API_URL}?key=${API_KEY}`, newRecipe);
    state.recipe = createNewRecipe(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
}

export function addListItem(count, unit, ingredient) {
  const item = {
    id: uniqid(),
    count,
    step: count,
    unit,
    ingredient,
  };
  state.shoppingList.push(item);
  localStorage.setItem('shoppingList', JSON.stringify(state.shoppingList));
}

export function deleteListItem(id) {
  const idx = state.shoppingList.findIndex(item => id == item.id);
  state.shoppingList.splice(idx, 1);
  localStorage.setItem('shoppingList', JSON.stringify(state.shoppingList));
}

export function updateCount(id, newCount) {
  state.shoppingList.find(item => id == item.id).count =
    newCount == 0 ? null : newCount;
  localStorage.setItem('shoppingList', JSON.stringify(state.shoppingList));
}

function init() {
  const storedFavourites = localStorage.getItem('favourites');
  const storedShoppingList = localStorage.getItem('shoppingList');
  if (storedFavourites) {
    state.favourites = JSON.parse(storedFavourites);
  }
  if (storedShoppingList) {
    state.shoppingList = JSON.parse(storedShoppingList);
  }
}
init();
