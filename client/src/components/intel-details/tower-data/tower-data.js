import React from 'react';
import { socket } from 'globals/socket';
import { clone } from 'globals/utils';
import { towerImageGet } from "globals/api.js";
import CharacterData from '../character-data/character-data';
import TeamImage from '../team-image/team-image.js';
import CharactersUsed from '../characters-used/characters-used';
import './tower-data.css';
const characters = require('data/characters.json');

class TowerData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characterOptions: clone(characters),
      selectedCharacters: Array(6).fill(null),
      isEditingList: Array(6).fill(false),
      towerData: {},
      towerImages: {}
    };

    this.towerDataRef = React.createRef(null);

    this.updateCharacterEvent = this.updateCharacterEvent.bind(this);
  }

  componentDidMount() {
    // Watch socket events
    socket.on("updateCharacterSuccess", this.updateCharacterEvent);

    // Setup the initial selected characters on tower load
    const selectedCharacters = this.state.selectedCharacters;

    // Set the initial selected when first loading this component
    for (let i = 0; i < this.props.towerData.characters.length; i++) {
      selectedCharacters.splice(i, 1, this.props.towerData.characters[i].name);
    }

    // Set the state and load necessary data
    this.setState({ towerData: this.props.towerData, selectedCharacters }, () => {
      this.updateCharacterOptions();
      this.loadTowerImages();
      this.towerDataRef.current.scrollIntoView();
    });
  }

  componentWillUnmount() {
    socket.off("updateCharacterSuccess", this.updateCharacterEvent);
  }

  async loadTowerImages() {
    const reponse = await towerImageGet(this.props.pageId, this.state.towerData.location, this.state.towerData._id);
    const images = await reponse.json();
    this.setState({ towerImages: images });
  }

  updateCharacterEvent(towerData) {
    if (towerData._id === this.props.towerData._id) {
      this.setState({ towerData });
    }
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
          key={this.state.towerData.characters[i]._id}
          character={this.state.towerData.characters[i]}
          options={this.state.characterOptions}
          pageId={this.props.pageId}
          towerData={this.state.towerData}
          teamIndex={i <= 2 ? 1 : 2}
          characterIndex={i}
          isEditing={this.state.isEditingList[i]}
          editChange={(value) => this.updateIsEditing(value, i)}
          selectionChange={(option) => this.updateCharacterOptions(option, i)}
        />
      ));
    }

    return elements;
  }

  getTeamImage(teamIndex) {
    const towerImages = this.state.towerImages;

    if (towerImages && towerImages[this.state.towerData._id]) {
      const index = teamIndex - 1 >= 0 ? teamIndex - 1 : 0;
      return towerImages[this.state.towerData._id][index];
    }
  }

  getCharactersUsed(teamIndex) {
    const teamKey = `team${teamIndex}`;
    return this.state.towerData.charactersUsed[teamKey].filter((item) => item.team === teamIndex);
  }

  render() {
    // Show nothing if tower data state isn't defined yet
    if (Object.keys(this.state.towerData).length === 0) {
      return null;
    }

    // Show the tower information
    const characterElements = this.getCharacterElements();

    return (
      <div ref={this.towerDataRef} className="tower-data container">
        <div className="tower-header">
          <span className="tower-name">{this.state.towerData.name}</span>
          <span className="tower-location">{this.state.towerData.location}</span>
        </div>

        <div className="tower-team">
          {/* TEAM 1 */}
          <h3 className="tower-team-title">Team 1</h3>
          <div className="tower-characters">
            {characterElements.slice(0, 3)}
            <CharactersUsed
              pageId={this.props.pageId}
              towerLocation={this.state.towerData.location}
              towerId={this.state.towerData._id}
              teamIndex={1}
              characters={this.getCharactersUsed(1)}
            />
            <TeamImage
              pageId={this.props.pageId}
              towerLocation={this.state.towerData.location}
              towerId={this.state.towerData._id}
              teamIndex={1}
              image={this.getTeamImage(1)}
            />
          </div>

          {/* TEAM 2 */}
          <h3 className="tower-team-title">Team 2</h3>
          <div className="tower-characters">
            {characterElements.slice(3, 6)}
            <CharactersUsed
              pageId={this.props.pageId}
              towerLocation={this.state.towerData.location}
              towerId={this.state.towerData._id}
              teamIndex={2}
              characters={this.getCharactersUsed(2)}
            />
            <TeamImage
              pageId={this.props.pageId}
              towerLocation={this.state.towerData.location}
              towerId={this.state.towerData._id}
              teamIndex={2}
              image={this.getTeamImage(2)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TowerData;
