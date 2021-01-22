import React, { useEffect, useState } from "react";
import Select from 'react-select'
import "./tower-info.css";
import { socket, getPageId } from "globals/socket.js";
import { clone } from "globals/utils";
import CharacterInfo from "../character-info/character-info";
const characterOptions = require("constants/character-info.json");

/**
 * Updates the character dropdowns and disables the selected options.
 *
 * @param {*} state
 * @param {*} setState
 * @param {*} selectedOption
 * @param {*} characterIndex
 */
const changeList = (state, setState, selectedOption, characterIndex) => {
  const selected = state.selected;
  const options = state.options;

  // Add the selected option to array and disable the necessary characters
  if (selectedOption && characterIndex) {
    selected.splice(characterIndex, 1, selectedOption);
  }
  options.forEach((option) => option.isDisabled = selected.includes(option.value))

  // Update the state
  setState({ options, selected });
}

/**
 * Emit socket event to update the character dropdown.
 *
 * @param {*} props
 * @param {*} teamIndex
 * @param {*} characterIndex
 * @param {*} characterName
 */
const updateCharacter = (props, teamIndex, characterIndex, characterName) => {
  socket.emit("updateCharacter", {
    pageId: getPageId(),
    towerIndex: props.towerIndex,
    towerName: props.tower.name,
    teamIndex: teamIndex,
    characterIndex: characterIndex,
    characterName: characterName,
  });
}

/**
 * Builds and returns the HTML that will be rendered on the page.
 *
 * @param {*} props
 * @param {*} state
 * @param {*} setState
 */
const getCharacterElements = (props, state, setState) => {
  const characterElements = [];

  for (let i = 0; i < 6; i++) {
    const teamIndex = i < 3 ? 0 : 1;
    const savedCharacter = props.tower.characters[i].name;
    const currentCharacter = characterOptions.find((character) => character.value === savedCharacter);

    characterElements.push((
      <div className="tower-character-data" key={i}>
        <Select
          className="select-dropdown"
          placeholder="Select character..."
          options={state.options}
          value={currentCharacter}
          onChange={(e) => {
            changeList(state, setState, e.value, i);
            updateCharacter(props, teamIndex, i, e.value);
          }}
        />
        <CharacterInfo
          disabled={state.selected[i] == null}
          towerName={props.tower}
          towerIndex={props.towerIndex}
          teamIndex={teamIndex}
        />
      </div>
    ));
  }

  return characterElements;
}

const TowerInfo = (props) => {
  // Define state and create elements to render
  const [state, setState] = useState({
    options: clone(characterOptions),
    selected: Array(6).fill(null)
  });
  const characterElements = getCharacterElements(props, state, setState);

  // Update the dropdowns and after initial load (for when there is saved data)
  useEffect(() => {
    // Add the selected options retrieved from the database
    const selected = state.selected;
    for (let i = 0; i < props.tower.characters.length; i++) {
      selected.splice(i, 1, props.tower.characters[i].name);
    }

    // Update the state and disable what's necessary
    setState((prevState) => ({ ...prevState, selected }));
    changeList(state, setState);

    // Need empty cleanup function to prevent memory leak (why tho?)
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tower.characters]);

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
          {characterElements.slice(0, 3)}
        </div>

        {/* TEAM 2 */}
        <h3 className="tower-team-title">Team 2</h3>
        <div className="tower-characters">
          {characterElements.slice(3, 6)}
        </div>

        {/* Lock data to prevent uninteded changes */}
        <button>lock</button>
      </div>
    </div>
  );
};

export default TowerInfo;
