import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Navbar from './components/navbar/Navbar';
import Search from './components/searchbar/Search';
import Footer from './components/footer/Footer';
import Options from "./components/CharacterInfo.js"

const selectedIndexes = [null, null, null];

const changeList = (selectedIndex, state, currentIndex) => {

  for (let i = 0; i < state.length; i++){
    if (i === currentIndex){
      selectedIndexes.splice(i, 1, selectedIndex);
    }
  }

  for (let i = 0; i < selectedIndexes.length; i++) {
    const index = selectedIndexes[i];
  
    for (let j = 0; j < state.length; j++) {
      const stateOptions = state[j].options;
      stateOptions.forEach((option) => option.disabled = false);
  
      if (j !== currentIndex && index) {
        const selectedOption = stateOptions[index];
        selectedOption.disabled = true;
      }
    }
  }
  //const currentList = state[currentIndex].options;

  /*for (let i = 0; i < state.length; i++){
    const newOptions = state[i].options;

    if (i !== currentIndex){
      // Disable selection in other lists that dont equal listNum
      newOptions[selectedIndex].disabled = true;
      state[i].setOptions([...newOptions]);

      // Disable the two options that are selected in the other lists in the current list
      currentList[selectedIndex].disabled = true;
    }
    else{
      console.log(selectedIndexes);
      if (selectedIndexes[i] !== null && selectedIndexes[i] !== selectedIndex){
        console.log(selectedIndexes[i]);
        state[i].options[selectedIndex].disabled = false;
      }
      state[i].setOptions([...newOptions]);
      selectedIndexes.splice(i, 1, selectedIndex);
      console.log(selectedIndexes);
    }
  }
  state[currentIndex].setOptions([...currentList]);*/
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
