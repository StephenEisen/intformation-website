import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { clone } from 'globals/utils.js';
import Select from 'react-select'
import './characters-used.css';
const characters = require('data/characters.json');

class CharactersUsed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characterOptions: [],
      selectedCharacters: [],
      charactersUsedRows: [],
      showCharactersUsed: false
    }
  }

  toggleVisibility() {
    this.setState({ showCharactersUsed: !this.state.showCharactersUsed });
  }

  deleteCharactersRow(teamIndex) {
    let characterOptions = this.state.characterOptions;
    let selectedCharacters = this.state.selectedCharacters;
    let charactersUsedRows = this.state.charactersUsedRows;

    characterOptions.splice(teamIndex, 1);
    selectedCharacters.splice(teamIndex, 1);
    charactersUsedRows.splice(teamIndex, 1);

    this.setState({ characterOptions, selectedCharacters, charactersUsedRows });
  }

  addCharactersRow() {
    const elements = [];

    const characterOptions = this.state.characterOptions;
    characterOptions.push(clone(characters));
    const teamIndex = characterOptions.length - 1;

    for (let i = 0; i < 3; i++) {
      elements.push(
        <div key={i} className="flex-1">
          <Select
            className="select-dropdown"
            placeholder="Character"
            options={characterOptions[teamIndex]}
            onChange={(e) => this.updateCharacterOptions(e.value, teamIndex, i)}
          />
        </div>
      )
    }

    const charactersUsedRows = this.state.charactersUsedRows;
    charactersUsedRows.push(elements);

    const selectedCharacters = this.state.selectedCharacters;
    selectedCharacters[teamIndex] = Array(3).fill(null);

    this.setState({ characterOptions, selectedCharacters, charactersUsedRows });
  }

  updateCharacterOptions(selectedOption, teamIndex, characterIndex) {
    const currentOptions = this.state.characterOptions[teamIndex];
    const currentSelected = this.state.selectedCharacters[teamIndex];

    // Add the selected option to array and disable the necessary characters
    if (selectedOption && teamIndex >= 0 && characterIndex >= 0) {
      currentSelected.splice(characterIndex, 1, selectedOption);
    }
    currentOptions.forEach((option) => option.isDisabled = currentSelected.includes(option.value));

    // Update the state
    const updatedSelected = this.state.selectedCharacters;
    updatedSelected[teamIndex] = currentSelected;

    const updatedOptions = this.state.characterOptions;
    updatedOptions[teamIndex] = currentOptions;

    this.setState({ characterOptions: updatedOptions, selectedCharacters: updatedSelected });
  }

  render() {
    return (
      <div className="characters-used">
        <div className="characters-used-toggle" onClick={() => this.toggleVisibility()}>Show used teams</div>

        <div className="characters-used-container" hidden={!this.state.showCharactersUsed}>
          {
            this.state.charactersUsedRows.map((elements, index) => (
              <div key={index}>
                {/* CHARACTERS USED HEADER */}
                <div className="characters-used-header">
                  <div className="flex-container">
                    <div className="flex-1">
                      <FontAwesomeIcon icon={faTimes} />
                      Team {index + 1}
                    </div>
                    <div className="flex-1">
                      <label><input type="checkbox" value="victory" />Victory</label>
                    </div>
                  </div>
                </div>

                {/* CHARACTERS USED DROPDOWNS */}
                <div key={index} className="characters-used-items flex-container">{elements}</div>
              </div>
            ))
          }

          <button className="characters-used-add center-underline-btn" onClick={() => this.addCharactersRow()}>
            <span className="slide-btn-text"><FontAwesomeIcon icon={faUserPlus} />Add team</span>
          </button>
        </div>
      </div>
    );
  }
};

export default CharactersUsed;
