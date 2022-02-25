import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if(module.hot){
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();
    
    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    
  }
  catch (err) {
  recipeView.renderError(`${err} 💥💥💥`);
  console.log(err);
  }
};

const controlSearchResults = async function(){

  try{
    console.log(resultsView); 
    
    // 1) Get search Query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load search results
   await model.loadSearchResults(query);

  //  3) Render Search Results
   resultsView.render(model.getSearchResultsPage());
  }
  catch(err){
    console.log(err);
  }
};
controlSearchResults();

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
