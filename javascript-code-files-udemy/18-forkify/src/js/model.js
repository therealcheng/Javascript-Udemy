import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

// Loading Recipe
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    console.log(data);
    // Format Recipe (quick way)
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    // temp error handling
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL.substring(0, 37)}/search?q=${query}`); //
    // console.log(data.recipes);

    state.search.results = data.recipes.map(recipes => {
      return {
        id: recipes.id,
        title: recipes.title,
        publisher: recipes.publisher,
        image: recipes.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.error(err);
  }
};

// loadSearchResults('pizza');
