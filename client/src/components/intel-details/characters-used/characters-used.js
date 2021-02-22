import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { socket } from 'globals/socket.js';
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
      victoryList: [],
      showCharactersUsed: false
    };

    this.updateCharacterFromSocket = this.updateCharacterFromSocket.bind(this);
  }

  componentDidMount() {
    socket.on('updateCharactersUsedSuccess', this.updateCharacterFromSocket);

    const numberOfRows = this.props.characters.length;
    const selectedCharacters = Array(numberOfRows).fill(null);
    const characterOptions = Array(numberOfRows).fill(clone(characters));

    // Set the initial selected when first loading this component
    for (let i = 0; i < numberOfRows; i++) {
      selectedCharacters.splice(i, 1, this.props.characters[i].characters);
    }

    this.setState({ characterOptions, selectedCharacters }, () => {
      for (let i = 0; i < numberOfRows; i++) {
        this.updateCharacterOptions(i);
      }
    });
  }

  componentWillUnmount() {
    socket.off('updateCharactersUsedSuccess', this.updateCharacterFromSocket);
  }

  toggleVisibility() {
    this.setState({ showCharactersUsed: !this.state.showCharactersUsed });
  }

  getCharacterName(rowIndex, characterIndex) {
    return this.state.characterOptions[rowIndex].find((character) => {
      return character.value === this.state.selectedCharacters[rowIndex][characterIndex];
    });
  }

  emitCharactersUsed(rowIndex) {
    socket.emit('updateCharactersUsed', {
      pageId: this.props.pageId,
      towerLocation: this.props.towerLocation,
      towerId: this.props.towerId,
      team: this.props.teamIndex,
      rowIndex: rowIndex,
      victory: this.state.victoryList[rowIndex],
      characters: this.state.selectedCharacters[rowIndex]
    });
  }

  updateCharacterFromSocket(charactersUsedData) {
    const towerId = charactersUsedData.towerId;
    const teamIndex = charactersUsedData.team;

    if (towerId === this.props.towerId && teamIndex === this.props.teamIndex) {
      const rowIndex = charactersUsedData.rowIndex;

      const selectedCharacters = this.state.selectedCharacters;
      selectedCharacters[rowIndex] = charactersUsedData.characters;
      const victoryList = this.state.victoryList;
      victoryList[rowIndex] = charactersUsedData.victory;

      const characterOptions = this.state.characterOptions;
      if (characterOptions.length - 1 < rowIndex) {
        characterOptions.push(clone(characters));
      }

      this.setState({ characterOptions, selectedCharacters, victoryList }, () => this.updateCharacterOptions(rowIndex));
    }
  }

  updateCharacterOptions(rowIndex, characterIndex, selectedOption) {
    const currentOptions = this.state.characterOptions[rowIndex];
    const currentSelected = this.state.selectedCharacters[rowIndex];

    // Add the selected option to array and disable the necessary characters
    if (selectedOption && rowIndex >= 0 && characterIndex >= 0) {
      currentSelected.splice(characterIndex, 1, selectedOption);
    }
    currentOptions.forEach((option) => option.isDisabled = currentSelected.includes(option.value));

    // Update the state and emit
    const selectedCharacters = this.state.selectedCharacters;
    selectedCharacters[rowIndex] = currentSelected;

    const characterOptions = this.state.characterOptions;
    characterOptions[rowIndex] = currentOptions;

    this.setState({ characterOptions, selectedCharacters }, () => {
      if (rowIndex >= 0 && characterIndex >= 0) {
        this.emitCharactersUsed(rowIndex);
      }
    });
  }

  updateVictory(rowIndex, isChecked) {
    const victoryList = this.state.victoryList;
    victoryList[rowIndex] = isChecked;
    this.setState({ victoryList }, () => this.emitCharactersUsed(rowIndex));
  }

  deleteCharactersRow(rowIndex) {
    const characterOptions = this.state.characterOptions;
    const selectedCharacters = this.state.selectedCharacters;
    const victoryList = this.state.victoryList;

    characterOptions.splice(rowIndex, 1);
    selectedCharacters.splice(rowIndex, 1);
    victoryList.splice(rowIndex, 1);

    this.setState({ characterOptions, selectedCharacters, victoryList });
  }

  addCharactersRow() {
    const characterOptions = this.state.characterOptions;
    characterOptions.push(clone(characters));

    const rowIndex = characterOptions.length - 1;
    const selectedCharacters = this.state.selectedCharacters;
    selectedCharacters[rowIndex] = Array(3).fill(null);

    this.setState({ characterOptions, selectedCharacters }, () => this.emitCharactersUsed(rowIndex));
  }

  getCharacterUsedElements() {
    const rows = [];

    for (let i = 0; i < this.state.selectedCharacters.length; i++) {
      const elements = [];

      for (let j = 0; j < 3; j++) {
        elements.push(
          <div key={`team${i}-character${j}`} className="flex-1">
            <Select
              className="select-dropdown"
              placeholder="Character"
              options={this.state.characterOptions[i]}
              value={this.getCharacterName(i, j)}
              onChange={(e) => this.updateCharacterOptions(i, j, e.value)}
            />
          </div>
        )
      }

      rows.push(elements);
    }

    return rows;
  }

  render() {
    const characterUsedElements = this.getCharacterUsedElements();

    return (
      <div className="characters-used">
        <div className="characters-used-toggle" onClick={() => this.toggleVisibility()}>
          <FontAwesomeIcon icon={this.state.showCharactersUsed ? faCaretDown : faCaretUp} />
          Show used teams against enemy
        </div>

        <div className="characters-used-container" hidden={!this.state.showCharactersUsed}>
          {
            characterUsedElements.map((elements, index) => (
              <div key={index}>
                {/* CHARACTERS USED HEADER */}
                <div className="characters-used-header">
                  <div className="flex-container">
                    <div className="flex-1">
                      <FontAwesomeIcon icon={faUsers} />
                      Team {index + 1}
                    </div>
                    <div className="flex-1">
                      <label>
                        <input
                          type="checkbox"
                          value="victory"
                          checked={this.state.victoryList[index]}
                          onChange={(e) => this.updateVictory(index, e.target.checked)}
                        />
                        Victory
                      </label>
                    </div>
                  </div>
                </div>

                {/* CHARACTERS USED DROPDOWNS */}
                <div className="characters-used-items flex-container">{elements}</div>
              </div>
            ))
          }

          <hr className="characters-used-divider" />

          <button className="characters-used-add center-underline-btn" onClick={() => this.addCharactersRow()}>
            <span className="slide-btn-text"><FontAwesomeIcon icon={faUserPlus} />Add team</span>
          </button>
        </div>
      </div>
    );
  }
};

export default CharactersUsed;
