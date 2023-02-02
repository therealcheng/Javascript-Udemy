import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import View from './views/view.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

///////////////////////////////////////

// fetching Jonas Recipe API
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // get id from url without '#'
    // console.log(id);
    if (!id) return; // guard clause to short circuit when there is no id.

    recipeView.renderSpinner(); // shows loading spinner

    //? 1 loading recipe
    await model.loadRecipe(id);

    //? 2 Rendering Recipe, html markup
    recipeView.render(model.state.recipe); // render method in recipeView
  } catch (err) {
    recipeView.renderError(`${err} 🔥`);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get the search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results from query
    await model.loadSearchResults(query); // manipulate state to show load results (pizza test).

    // 3) Render Results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
