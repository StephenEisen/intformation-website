import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Search from './components/searchbar/Search';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Search />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
