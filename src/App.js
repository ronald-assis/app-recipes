import React from 'react';
import RecipesProvider from './context/provider';
import './Global.css';
import Routes from './components/Routes';

function App() {
  return (
    <div className="meals">
      <RecipesProvider>
        <Routes />
      </RecipesProvider>
    </div>
  );
}

export default App;
