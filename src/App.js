import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/provider';
import Login from './pages/Login';

document.getElementById('root').classList.add('root');

function App() {
  return (
    <div className="root">
      <RecipesProvider>
        <Switch>
          <Route path="/" component={ Login } />
          <Route path="/foods" />
        </Switch>
      </RecipesProvider>

    </div>
  );
}

export default App;
