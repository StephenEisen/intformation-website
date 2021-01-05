import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Navbar from './components/navbar/Navbar';
import Search from './components/searchbar/Search';
import Footer from './components/footer/Footer';
import Options from "./components/CharacterInfo.js"

let selectedIndexes = [null, null, null];

const changeList = (selectedIndex, state, currentIndex) => {

  // Get the selected option indexes and enable all options for each list
  for (let i = 0; i < state.length; i++){
    if (i === currentIndex){
      selectedIndexes.splice(i, 1, selectedIndex);
    }

    state[i].options.forEach((option) => option.disabled = false);
  }

  // Get each selected index and disable it for the lists (except the dropdown it was chosen on).
  for (let i = 0; i < selectedIndexes.length; i++) {
    const index = selectedIndexes[i];

    for (let j = 0; j < state.length; j++) {
      const stateOptions = state[j].options;

      if (j !== currentIndex && index !== null) {
        const selectedOption = stateOptions[index];
        selectedOption.disabled = true;
      }

      state[j].setOptions([...stateOptions]);
    }
  }
}

function App() {
  const [options1, setOptions1] = useState(Options);
  const [options2, setOptions2] = useState(Options);
  const [options3, setOptions3] = useState(Options);
  const state = [
    {options: options1, setOptions: setOptions1},
    {options: options2, setOptions: setOptions2},
    {options: options3, setOptions: setOptions3}   
  ];
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <ul class="container-search">
          <li>
            <Search options={state[0].options} onChange={(index) =>changeList(index, state, 0)}/>
          </li>
          <li>
            <Search options={state[1].options} onChange={(index) =>changeList(index, state, 1)}/>
          </li>
          <li>
            <Search options={state[2].options} onChange={(index) =>changeList(index, state, 2)}/>
          </li>
        </ul>

        <p>
         smol pp
        </p>
      </header>

      <Footer />
    </div>
  );
}

export default App;
