import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';


// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();
    
    // 0) Update Results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

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

    // 4) Render Initial Pagination Buttons
    paginationView.render(model.state.search);

  }
  catch(err){
    recipeView.renderError(`${err} 💥💥💥`)
    console.log(err);
  }
};


const controlPagination = function(goToPage){
  //  1) Render New Search Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render New Initial Pagination Buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  // Update the recipe Servings(in state)
  model.updateServings(newServings);

  // Update the recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();
