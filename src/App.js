import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import './Global.css';

function App() {
  return (
    <div className="meals">
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
        </Switch>
      </RecipesProvider>

    </div>
  );
}

export default App;
