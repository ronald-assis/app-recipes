import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import MainRecipes from '../pages/MainRecipes';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreDrinksByIngredients from '../pages/ExploreDrinksByIngredients';
import ExploreFoodsByIngredients from '../pages/ExploreFoodsByIngredients';
import ExploreFoodsNationalities from '../pages/ExploreFoodsNationalities';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeFoodDetails from '../pages/RecipeFoodDetails';
import RecipeDrinkDetails from '../pages/RecipeDrinkDetails';
import RecipesInProgress from '../pages/RecipesInProgress';

export default function Routes() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ MainRecipes } />
      <Route exact path="/drinks" component={ MainRecipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/foods/:id" component={ RecipeFoodDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDrinkDetails } />
      <Route exact path="/foods/:id/in-progress" component={ RecipesInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipesInProgress } />

      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksByIngredients }
      />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />
    </div>
  );
}
