import React from "react";
import Select from 'react-select'
import hp from 'assets/icons/hp.png';
import speed from 'assets/icons/speed.png';
import artifact from 'assets/icons/artifact.png';
import notes from 'assets/icons/notes.png';
import { socket } from "globals/socket";
import "./character-data.css";

class CharacterData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.character.name,
      hp: props.character.hp || '',
      speed: props.character.speed || '',
      artifact: props.character.artifact || '',
      notes: props.character.notes || ''
    };
  }

  emitCharacterData() {
    socket.emit("updateCharacter", {
      pageId: this.props.intelId,
      team: this.props.character.team,
      towerIndex: this.props.towerIndex,
      characterIndex: this.props.characterIndex,
      ...this.state
    });
  }

  updateCharacterSelection(option) {
    this.setState({ name: option }, () => this.emitCharacterData());
    this.props.selectionChange(option);
  }

  getSelectedCharacter() {
    return this.props.options.find((character) => character.value === this.state.name);
  }

  updateCharacterData(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <div className="character-data-container">
        <Select
          className="select-dropdown"
          placeholder="Select character..."
          options={this.props.options}
          value={this.getSelectedCharacter()}
          onChange={(e) => this.updateCharacterSelection(e.value)}
        />

        <div className="character-stats-container">
          <div className="character-data">
            <label className="input-label">
              <img src={hp} alt="" />
            </label>
            <input
              type="number"
              placeholder="Health Points"
              value={this.state.hp}
              onChange={(e) => this.updateCharacterData('hp', e.target.value)}
              onBlur={() => this.emitCharacterData()}>
            </input>
          </div>

          <div className="character-data">
            <label className="input-label">
              <img src={speed} alt="" />
            </label>
            <input
              type="number"
              placeholder="Speed"
              value={this.state.speed}
              onChange={(e) => this.updateCharacterData('speed', e.target.value)}
              onBlur={() => this.emitCharacterData()}>
            </input>
          </div>

          <div className="character-data">
            <label className="input-label">
              <img src={artifact} alt="" />
            </label>
            <input
              type="text"
              placeholder="Artifact"
              value={this.state.artifact}
              onChange={(e) => this.updateCharacterData('artifact', e.target.value)}
              onBlur={() => this.emitCharacterData()}>
            </input>
          </div>

          <div className="character-data">
            <label className="input-label">
              <img src={notes} alt="" />
            </label>
            <input
              type="text"
              placeholder="Notes"
              value={this.state.notes}
              onChange={(e) => this.updateCharacterData('notes', e.target.value)}
              onBlur={() => this.emitCharacterData()}>
            </input>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterData;
