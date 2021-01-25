import React from "react";
import Select from 'react-select'
import "./tower-info.css";
import { clone } from "globals/utils";
import { socket } from "globals/socket.js";
import { CharacterData } from "models/character.model";
import CharacterInfo from "../character-info/character-info";
const characterOptions = require("constants/character-info.json");

class TowerInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: clone(characterOptions),
      selected: Array(6).fill(null),
      characterList: Array(6).fill({}),
    };
  }

  componentDidMount() {
    const selected = this.state.selected;
    const characterList = [];

    for (let i = 0; i < this.props.tower.characters.length; i++) {
      const character = this.props.tower.characters[i];

      const characterData = new CharacterData({
        towerIndex: this.props.towerIndex,
        characterIndex: i,
        team: character.team,
        name: character.name,
        hp: character.hp,
        speed: character.speed,
        artifact: character.artifact,
        notes: character.notes
      });

      selected.splice(i, 1, characterData.name);
      characterList.push(characterData);
    }

    this.setState((prevState) => ({ ...prevState, selected, characterList }));
    this.changeList();
  }

  changeList(selectedOption, characterIndex) {
    const selected = this.state.selected;
    const options = this.state.options;

    // Add the selected option to array and disable the necessary characters
    if (selectedOption && characterIndex) {
      selected.splice(characterIndex, 1, selectedOption);
    }
    options.forEach((option) => option.isDisabled = selected.includes(option.value))

    // Update the state
    this.setState((prevState) => ({ ...prevState, options, selected }));
  }

  updateCharacter(teamIndex, characterIndex, characterName) {
    const data = this.state.characterList;
    data[characterIndex] = {
      pageId: this.props.intelID,
      towerIndex: this.props.towerIndex,
      characterIndex: characterIndex,
      team: teamIndex,
      name: characterName
    };

    socket.emit("updateCharacter", data[characterIndex]);
    this.setState((prevState) => ({ ...prevState, characterData: data }));
  }

  getCharacterElements() {
    const characterElements = [];

    for (let i = 0; i < 6; i++) {
      const teamIndex = i < 3 ? 0 : 1;
      const savedCharacter = this.props.tower.characters[i].name;
      const currentCharacter = characterOptions.find((character) => character.value === savedCharacter);

      characterElements.push((
        <div className="tower-character-data" key={i}>
          <Select
            className="select-dropdown"
            placeholder="Select character..."
            options={this.state.options}
            value={currentCharacter}
            onChange={(e) => {
              this.changeList(e.value, i);
              this.updateCharacter(teamIndex, i, e.value);
            }}
          />
          <CharacterInfo
            disabled={this.state.selected[i] == null}
            characterData={this.state.characterList[i]}
          />
        </div>
      ));
    }

    return characterElements;
  }

  render() {
    const characterElements = this.getCharacterElements();

    return (
      <div className="container">
        <div className="tower-info">
          <span className="tower-name">{this.props.tower.name}</span>
          <span className="tower-location">{this.props.tower.location}</span>
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
    )
  }
}

export default TowerInfo;
