import React, {useState} from 'react';
import Search from '../searchbar/Search.js';
import Options from "../CharacterInfo.js"
import "./Defence.css";
import logo from '../../enott.png';

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

const Defence = () => {
    console.log("mos pp");
    const [options1, setOptions1] = useState(Options);
    const [options2, setOptions2] = useState(Options);
    const [options3, setOptions3] = useState(Options);
    const state = [
      {options: options1, setOptions: setOptions1},
      {options: options2, setOptions: setOptions2},
      {options: options3, setOptions: setOptions3}   
    ]
    return(
        <div className="defence-body">

            <img src={logo} className="App-logo" alt="logo" />

            <ul className="container-search">
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
        </div>
    );
}

export default Defence;