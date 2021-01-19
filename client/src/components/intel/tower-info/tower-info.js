import React, { useState } from "react";
import { socket, getPageId } from "globals/socket.js";
import "./tower-info.css";
import Select from 'react-select'
import CharacterInfo from "../character-info/character-info";

const characterOptions = require("constants/character-info.json");
let selectedOptions = Array(6).fill(null);

const changeList = (option, state, characterIndex) => {
  // Add selection option
  selectedOptions.splice(characterIndex, 1, option);

  // Get the selected option indexes and enable all options for each list
  for (let i = 0; i < state.length; i++) {
    if (i !== characterIndex) {
      state[i].options.forEach((option) => (option.isDisabled = false));
    }
  }

  // Get each selected option and disable it for the lists (except the dropdown it was chosen on).
  for (let i = 0; i < selectedOptions.length; i++) {
    const selectedOption = selectedOptions[i];

    for (let j = 0; j < state.length; j++) {
      const stateOptions = state[j].options;

      if (j !== characterIndex && selectedOption !== null) {
        const stateOption = stateOptions.find((item) => item.value === selectedOption);
        stateOption.isDisabled = true;
        state[j].setOptions([...stateOptions]);
      }
    }
  }
};

const updateCharacter = (props, characterIndex, characterName) => {
  socket.emit("updateCharacter", {
    pageId: getPageId(),
    towerIndex: props.towerIndex,
    towerName: props.tower.name,
    characterIndex: characterIndex,
    characterName: characterName
  });
}

const getCharacterList = (props, state) => {
  const characterList = [];

  for (let i = 0; i < 6; i++) {
    characterList.push((
      <div className="tower-character-data" key={i}>
        <Select
          className="select-dropdown"
          options={state[i].options}
          onChange={(e) => {
            changeList(e.value, state, i);
            updateCharacter(props, i, e.value);
          }}
        />
        <CharacterInfo
          disabled={selectedOptions[i] === null}
          towerName={props.tower}
          towerIndex={props.towerIndex}
          teamIndex={i < 3 ? 0 : 1}
        />
      </div>
    ));
  }

  return characterList;
}

const TowerInfo = (props) => {
  // Define states
  const [dropdown1, setOption1] = useState(characterOptions);
  const [dropdown2, setOption2] = useState(characterOptions);
  const [dropdown3, setOption3] = useState(characterOptions);
  const [dropdown4, setOption4] = useState(characterOptions);
  const [dropdown5, setOption5] = useState(characterOptions);
  const [dropdown6, setOption6] = useState(characterOptions);

  const state = [
    { options: dropdown1, setOptions: setOption1 },
    { options: dropdown2, setOptions: setOption2 },
    { options: dropdown3, setOptions: setOption3 },
    { options: dropdown4, setOptions: setOption4 },
    { options: dropdown5, setOptions: setOption5 },
    { options: dropdown6, setOptions: setOption6 },
  ];

  // Create elements
  const characterList = getCharacterList(props, state);

  // Render tower info
  return (
    <div className="container">
      <div className="tower-info">
        <span className="tower-name">{props.tower.name}</span>
        <span className="tower-location">{props.tower.location}</span>
      </div>

      <div className="tower-team">
        {/* TEAM 1 */}
        <h3 className="tower-team-title">Team 1</h3>
        <div className="tower-characters">
          {characterList.slice(0, 3)}
        </div>

        {/* TEAM 2 */}
        <h3 className="tower-team-title">Team 2</h3>
        <div className="tower-characters">
          {characterList.slice(3, 6)}
        </div>
      </div>
    </div>
  );
};

export default TowerInfo;
