import React from 'react';
import { Switch } from 'react-router-dom';
import RecipesProvider from './context/provider';
import './Global.css';
import Routes from './components/Routes';

function App() {
  return (
    <div className="meals">
      <RecipesProvider>
        <Switch>
          <Routes />
        </Switch>
      </RecipesProvider>

    </div>
  );
}

export default App;
