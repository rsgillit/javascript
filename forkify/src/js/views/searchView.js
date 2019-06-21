import { elements } from './base';

export const getInput = () => elements.searchInput.value ;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = ()=>{
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, curr) => {
            if(acc + curr.length <= limit){
                newTitle.push(curr);
            }
            return acc + curr.length;
        },0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};


export const highlightSelected = id => {
    const resultArr = Array.from(document.querySelectorAll('.results_link'));
    console.log(resultArr);
    resultArr.forEach(el => el.classList.remove('results__link--active'));
    document.querySelector(`a[href*="#${id}"]`).classList.add('results__link--active');
};

const renderRecipe = recipe => {
    const markup = `
        <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;

    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

//type: prev or next
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page -1 : page + 1}">
        <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    //console.log(page, numResults, resPerPage);
    if(page === 1){
        //Only button to go to next page
        button = createButton(page, 'next');
        //console.log(button);
    } else if (page < pages) {
        //Both buttons
        button = `${createButton(page, 'next')}
                    ${createButton(page, 'prev')}`;

    } else if(page === pages && pages > 1) {
        //Only button to go to previous page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};

export const renderResults = (recipes, page = 1, resPerpage =10) => {
    const start = (page -1) * resPerpage;
    const end = page * resPerpage;
    console.log(recipes);
    recipes.slice(start,end).forEach(el => renderRecipe(el));

    renderButtons(page, recipes.length, resPerpage);
    //recipes.forEach(el => renderRecipe(el));

};