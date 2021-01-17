import React, { useState } from "react";
import CharacterSelect from "components/character-select/character-select.js";
import "./tower-info.css";
import { socket, getPageId } from "globals/socket.js";

const characterOptions = require("constants/character-info.json");
let selectedIndexes = [null, null, null];

const changeList = (selectedIndex, state, currentIndex) => {
  // Get the selected option indexes and enable all options for each list
  for (let i = 0; i < state.length; i++) {
    if (i === currentIndex) {
      selectedIndexes.splice(i, 1, selectedIndex);
    }

    state[i].options.forEach((option) => (option.disabled = false));
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
};

const TowerInfo = (props) => {

  const [options1, setOptions1] = useState(characterOptions);
  const [options2, setOptions2] = useState(characterOptions);
  const [options3, setOptions3] = useState(characterOptions);
  const [options4, setOptions4] = useState(characterOptions);
  const [options5, setOptions5] = useState(characterOptions);
  const [options6, setOptions6] = useState(characterOptions);

  const state = [
    { options: options1, setOptions: setOptions1 },
    { options: options2, setOptions: setOptions2 },
    { options: options3, setOptions: setOptions3 },
    { options: options4, setOptions: setOptions4 },
    { options: options5, setOptions: setOptions5 },
    { options: options6, setOptions: setOptions6 },
  ];

  console.log(props);
  return (
    <div className="tower-body">
      <h1>tower name</h1>
      <ul className="container-search">
        <li key="0">
          <CharacterSelect
            options={state[0].options}
            onChange={(index) => changeList(index, state, 0)}
          />
          <input
            placeholder="hp"
            onBlur={(e) =>
              socket.emit("updateCharacterHp", {
                pageId: getPageId(),
                hp: e.target.value,
              })
            }
          ></input>
          <input placeholder="speed"></input>
          <input placeholder="additional notes"></input>
        </li>
        <li key="1">
          <CharacterSelect
            options={state[1].options}
            onChange={(index) => changeList(index, state, 1)}
          />
          <input placeholder="hp"></input>
          <input placeholder="speed"></input>
          <input placeholder="additional notes"></input>
        </li>
        <li key="2">
          <CharacterSelect
            options={state[2].options}
            onChange={(index) => changeList(index, state, 2)}
          />
          <input placeholder="hp"></input>
          <input placeholder="speed"></input>
          <input placeholder="additional notes"></input>
        </li>
        <li key="3">
          <CharacterSelect
            options={state[3].options}
            onChange={(index) => changeList(index, state, 3)}
          />
          <input placeholder="hp"></input>
          <input placeholder="speed"></input>
          <input placeholder="additional notes"></input>
        </li>
        <li key="4">
          <CharacterSelect
            options={state[2].options}
            onChange={(index) => changeList(index, state, 4)}
          />
          <input placeholder="hp"></input>
          <input placeholder="speed"></input>
          <input placeholder="additional notes"></input>
        </li>
        <li key="5">
          <CharacterSelect
            options={state[2].options}
            onChange={(index) => changeList(index, state, 5)}
          />
          <input placeholder="hp"></input>
          <input placeholder="speed"></input>
          <input placeholder="additional notes"></input>
        </li>
      </ul>
    </div>
  );
};

export default TowerInfo;
