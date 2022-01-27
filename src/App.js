import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

document.getElementById('root').classList.add('root');

function App() {
  return (
    <div className="root">
      <Switch>
        <Route path="/" component={ Login } />
        <Route path="/foods" />
      </Switch>
    </div>
  );
}

export default App;
