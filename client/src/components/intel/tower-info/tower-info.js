import React, { useState } from "react";
import CharacterSelect from "components/character-select/character-select.js";
import ArtifactSelect from "components/artifact-select/artifact-select.js";
import "./tower-info.css";
import { socket, getPageId } from "globals/socket.js";

const artifactOptions = require("constants/artifact-info.json");
const characterOptions = require("constants/character-info.json");
let selectedIndexes = [null, null, null];

const changeList = (selectedIndex, state, setState, currentIndex) => {
  // Get the selected option indexes and enable all options for each list
  for (let i = 0; i < state.length; i++) {
    if (i === currentIndex) {
      selectedIndexes.splice(i, 1, selectedIndex);
    }

    state[i].forEach((option) => (option.disabled = false));
  }

  // Get each selected index and disable it for the lists (except the dropdown it was chosen on).
  for (let i = 0; i < selectedIndexes.length; i++) {
    const index = selectedIndexes[i];

    for (let j = 0; j < state.length; j++) {
      const stateOptions = state[j];

      if (j !== currentIndex && index !== null) {
        const selectedOption = stateOptions[index];
        selectedOption.disabled = true;
      }

      const newState = { ...state };
      newState[j] = [...stateOptions];
      setState({ newState });
    }
  }
};

const updateCharacter = (index, props, teamIndex) => {
  socket.emit("updateCharacter", {
    pageId: getPageId(),
    towerIndex: props.towerIndex,
    towerName: props.tower.name,
    teamIndex: teamIndex,
    characterName: characterOptions[index].name
  });
}

const TowerInfo = (props) => {
  const [state, setState] = useState([
    characterOptions, characterOptions, characterOptions,
    characterOptions, characterOptions, characterOptions
  ]);

  const characterElements = [];

  for (let i = 0; i < 6; i++) {
    characterElements.push((
      <li key={i}>
        <CharacterSelect
          options={state[i]}
          onChange={(index) => {
            updateCharacter(index, props, i);
            changeList(index, state, setState, i);
          }}
        />
      </li>
    ));
  }

  return (
    <div className="tower-body">
      <h1 className="tower-name">{props.tower.name}</h1>
      <ul className="container-search">
        {characterElements}

        {/* put this shit in a loop */}
        {/* <li key="0">
          <CharacterSelect
            options={state[0].options}
            onChange={(index) => {
              updateTest(index, props, 0);
              changeList(index, state, 0);
            }}
          />
          <input
            placeholder="hp"
            onBlur={(e) =>
              socket.emit("updateTower", {
                pageId: getPageId(),
                name: props.tower.name,
                hp: e.target.value,
              })
            }
          ></input>
          <input
            placeholder="speed"
            onBlur={(e) =>
              socket.emit("updateTower", {
                pageId: getPageId(),
                name: props.tower.name,
                speed: e.target.value,
              })
            }
          ></input>
          <input
            placeholder="additional notes"
            onBlur={(e) =>
              socket.emit("updateTower", {
                pageId: getPageId(),
                name: props.tower.name,
                notes: e.target.value,
              })
            }
          ></input>
        </li>
        <li key="1">
          <CharacterSelect
            options={state[1].options}
            onChange={(index) => {
              updateTest(index, props, 1);
              changeList(index, state, 1);
            }}
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
        </li> */}
      </ul>
    </div>
  );
};

export default TowerInfo;
