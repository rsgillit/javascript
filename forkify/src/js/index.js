import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as listView from './views/listView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import { elements,renderLoader, clearLoader } from './views/base';

/** Global state of the app  *
 *  - Search object
 *  - Current receipe object
 *  - SHopping list object
 *  - Liked recipes
 */

const state = {};

const controlSearch = async () => {
    //1. get query from view
    const query = searchView.getInput(); //TODO
    console.log(query);
    if(query){
        //2. New search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4. Search for recipes
        try {
            await state.search.getResults();
            //5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(err){
            alert('Error processing recipe');
            clearLoader();
        }


    }
};

elements.searchForm.addEventListener('submit',e=>{
   e.preventDefault();
   controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
   }
});


//RECIPE CONTROLLER
const controlRecipe = async () => {
    //Get id from url
    const id = window.location.hash.replace('#','');
    console.log(id);
    if(id){
        //prepare UI for changes
        renderLoader(elements.recipe);

        //highlight select search item
        if(state.search){
            searchView.highlightSelected(id);
        }


        //create new recipe object
        state.recipe = new Recipe(id);
        //get recipe data
        try{
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings()

            //render recipe
            clearLoader();
            recipeView.clearRecipe();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            console.log(state.recipe);
        } catch(err){
            alert('Error processing recipe');
        }


    }
};

//window.addEventListener('hashchange' ,controlRecipe);
//window.addEventListener('load',controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = () => {
    if(!state.list){
        state.list = new List();
    }

    console.log(state.recipe.ingredients);
    state.recipe.ingredients.forEach(e1 => {
      const item = state.list.addItem(e1.count, e1.unit, e1.ingredient);
      listView.renderItem(item);
    });
};

window.addEventListener('load', ()=>{
    state.likes = new Likes();
    state.likes.readStorage();

    likesView.toggleLikeMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like => {
       likesView.renderLike(likes);
    });
});


const controlLike = () => {
    if(!state.like){
        state.like = new Likes();
    }

    const currentID = state.recipe.id;
    if(!state.likes.isLiked(currentID)){
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.id,
            state.recipe.author,
            state.recipe.img
        );

        likesView.toggleLikeBtn(true);
        likesView.renderLike(newLike);
    } else {
        state.likes.deleteLike(currentID);
        likesView.toggleLikeBtn(false);
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

        // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

//handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    console.log(e);
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
       if(state.recipe.servings > 1) {
           state.recipe.updateServings('dec');
           recipeView.updateServingsIngredients(state.recipe);
       }
   } else if(e.target.matches('.btn-increase, .btn-increase *')){
       state.recipe.updateServings('inc');
       recipeView.updateServingsIngredients(state.recipe);
   } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
       controlList();
       //console.log("here");
   } else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});

