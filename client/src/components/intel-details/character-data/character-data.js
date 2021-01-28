import React from "react";
import Select from 'react-select'
import hp from 'assets/icons/hp.png';
import speed from 'assets/icons/speed.png';
import artifact from 'assets/icons/artifact.png';
import notes from 'assets/icons/notes.png';
import counter from 'assets/icons/counter.png';
import immunity from 'assets/icons/immunity.png';
import lifesteal from 'assets/icons/lifesteal.png';
import lock from 'assets/icons/lock.png';
import enott from 'assets/characters/Enott.png';
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
      notes: props.character.notes || '',
      isEditing: props.isEditing || false
    };
  }

  emitCharacterData() {
    socket.emit("updateCharacter", {
      pageId: this.props.intelId,
      team: this.props.teamIndex,
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

  editCharacter(event, isEditing) {
    event.stopPropagation();
    this.setState({ isEditing });
  }

  render() {
    return (
      <div className={`character-data-container ${this.state.isEditing ? 'character-edit' : ''}`} onClick={(e) => this.editCharacter(e, true)}>
        {/* CHARACTER SELECTION */}
        <div className="character-selection">
          <div className={`select-dropdown ${!this.state.isEditing ? 'hidden' : ''}`}>
            <Select
              className="select-dropdown"
              placeholder="Select character"
              options={this.props.options}
              value={this.getSelectedCharacter()}
              onChange={(e) => this.updateCharacterSelection(e.value)}
            />
            <button className="slide-btn-horizontal" onClick={(e) => this.editCharacter(e, false)}>
              <span className="slide-btn-text"><img src={lock} />Close</span>
            </button>
          </div>

          <img src={enott} alt="Character" className={this.state.isEditing ? 'hidden' : ''} />
        </div>

        {/* CHARACTER STATS */}
        <div className="character-stats-container">
          <div className="character-stats-header">
            <div className="character-stats-left">
              <img src={artifact} alt="Artifact" /><span className="character-stat">{"A little Queen's Huge Crown".slice(0, 16)}...</span>
              <img src={hp} alt="Health Points" /><span className="character-stat">10000</span>
              <img src={speed} alt="Speed" /><span className="character-stat">100-200</span>
            </div>
            <div className="character-stats-right">
              <img src={lifesteal} alt="Lifesteal" />
              <img src={immunity} alt="Immunity" />
            </div>
            <div className={`character-stats-notes ${this.state.isEditing ? 'hidden' : ''}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </div>
          </div>

          {/* CHARACTER STATS EDIT */}
          <div className={`character-stats-inputs ${!this.state.isEditing ? 'hidden' : ''}`}>
            <input
              type="number"
              placeholder="Health Points"
              value={this.state.hp}
              onChange={(e) => this.updateCharacterData('hp', e.target.value)}
              onBlur={() => this.emitCharacterData()}>
            </input>

            <input
              type="number"
              placeholder="Speed"
              value={this.state.speed}
              onChange={(e) => this.updateCharacterData('speed', e.target.value)}
              onBlur={() => this.emitCharacterData()}>
            </input>

            <input
              type="text"
              placeholder="Artifact"
              value={this.state.artifact}
              onChange={(e) => this.updateCharacterData('artifact', e.target.value)}
              onBlur={() => this.emitCharacterData()}>
            </input>

            <textarea rows="2"
              value={this.state.notes}
              onChange={(e) => this.updateCharacterData('artifact', e.target.value)}
              onBlur={() => this.emitCharacterData()}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </textarea>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterData;
