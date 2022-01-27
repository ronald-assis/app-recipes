import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

document.getElementById('root').classList.add('root');

function App() {
  return (
    <div className="root">
      <Login />
    </div>
  );
}

export default App;
