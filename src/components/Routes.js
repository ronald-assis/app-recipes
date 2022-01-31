import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import MainRecipes from '../pages/MainRecipes';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import ExploreRecipes from '../pages/ExploreRecipes';
import ExploreByIngredients from '../pages/ExploreByIngredients';
import ExploreFoodsNationalities from '../pages/ExploreFoodsNationalities';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

export default function Routes() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ MainRecipes } />
      <Route exact path="/drinks" component={ MainRecipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreRecipes } />
      <Route exact path="/explore/drinks" component={ ExploreRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />

      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreByIngredients }
      />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreByIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />
    </div>
  );
}
