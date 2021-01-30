import React from "react";
import CharacterData from "../character-data/character-data";
import { clone } from "globals/utils";
import "./tower-data.css";
const characters = require("constants/character-info.json");

class TowerData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characterOptions: clone(characters),
      selectedCharacters: Array(6).fill(null),
      isEditingList: Array(6).fill(false)
    };
  }

  componentDidMount() {
    const selectedCharacters = this.state.selectedCharacters;

    // Set the initial selected when first loading this component
    for (let i = 0; i < this.props.towerData.characters.length; i++) {
      selectedCharacters.splice(i, 1, this.props.towerData.characters[i].name);
    }

    this.setState({ selectedCharacters });
    this.updateCharacterOptions();
  }

  updateCharacterOptions = (selectedOption, characterIndex) => {
    const characterOptions = this.state.characterOptions;
    const selectedCharacters = this.state.selectedCharacters;

    // Add the selected option to array and disable the necessary characters
    if (selectedOption && characterIndex >= 0) {
      selectedCharacters.splice(characterIndex, 1, selectedOption);
    }
    characterOptions.forEach((option) => option.isDisabled = selectedCharacters.includes(option.value));

    // Update the state
    this.setState({ characterOptions, selectedCharacters });
  }

  updateIsEditing(isEditing, characterIndex) {
    const isEditingList = Array(6).fill(false);
    isEditingList.splice(characterIndex, 1, isEditing);
    this.setState({ isEditingList });
  }

  getCharacterElements() {
    const elements = [];

    for (let i = 0; i < 6; i++) {
      elements.push((
        <CharacterData
          key={this.props.towerData.characters[i]._id}
          character={this.props.towerData.characters[i]}
          options={this.state.characterOptions}
          intelId={this.props.intelId}
          teamIndex={i <= 2 ? 1 : 2}
          towerIndex={this.props.towerIndex}
          characterIndex={i}
          isEditing={this.state.isEditingList[i]}
          editChange={(value) => this.updateIsEditing(value, i)}
          selectionChange={(option) => this.updateCharacterOptions(option, i)}
        />
      ));
    }

    return elements;
  }

  render() {
    const characterElements = this.getCharacterElements();

    return (
      <div className="container">
        <div className="tower-header">
          <span className="tower-name">{this.props.towerData.name}</span>
          <span className="tower-location">{this.props.towerData.location}</span>
        </div>

        <div className="tower-team">
          <h3 className="tower-team-title">Team 1</h3>
          <div className="tower-characters">
            {characterElements.slice(0, 3)}
          </div>

          <h3 className="tower-team-title">Team 2</h3>
          <div className="tower-characters">
            {characterElements.slice(3, 6)}
          </div>
        </div>
      </div>
    )
  }
}

export default TowerData;
