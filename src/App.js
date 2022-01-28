import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/provider';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';

document.getElementById('root').classList.add('root');

function App() {
  return (
    <div className="root">
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ MainRecipes } />
          <Route exact path="/drinks" component={ MainRecipes } />
        </Switch>
      </RecipesProvider>

    </div>
  );
}

export default App;
