import React from 'react';
import Select from 'react-select'
import { socket } from 'globals/socket';
import { CharacterImages } from 'globals/images';
import { clone } from 'globals/utils';
import avatar from 'assets/avatar.png';
import hp from 'assets/icons/hp.png';
import speed from 'assets/icons/speed.png';
import artifact from 'assets/icons/artifact.png';
import counter from 'assets/icons/counter.png';
import lifesteal from 'assets/icons/lifesteal.png';
import immunity from 'assets/icons/immunity.png';
import './character-data.css';

class CharacterData extends React.Component {
  constructor(props) {
    super(props);
    this.maxLengths = { hp: 5, speed: 3, notes: 150 };
    this.artifactList = clone(require('data/artifact-info.json'));

    this.state = {
      name: props.character.name,
      hp: props.character.hp || '',
      speed: props.character.speed || '',
      artifact: props.character.artifact || '',
      notes: props.character.notes || '',
      counter: props.character.counter || false,
      lifesteal: props.character.lifesteal || false,
      immunity: props.character.immunity || false
    };
  }

  emitCharacterData() {
    socket.emit('updateCharacter', {
      pageId: this.props.intelId,
      team: this.props.teamIndex,
      towerIndex: this.props.towerIndex,
      characterIndex: this.props.characterIndex,
      ...this.state
    });
  }

  getCharacterImage() {
    return CharacterImages[this.state.name] || avatar;
  }

  getSelectedCharacter() {
    return this.props.options.find((character) => character.value === this.state.name);
  }

  getSelectedArtifact() {
    return this.artifactList.find((artifact) => artifact.value === this.state.artifact);
  }

  getArtifactLabel() {
    const artifactName = this.state.artifact;

    if (artifactName.length > 12) {
      return artifactName.slice(0, 13) + '...';
    }

    return artifactName || '-';
  }

  updateCharacterSelection(option) {
    this.setState({ name: option }, () => this.emitCharacterData());
    this.props.selectionChange(option);
  }

  updateCharacterData(key, value) {
    const maxLength = this.maxLengths[key];
    const updatedValue = value.length > maxLength ? value.slice(0, maxLength) : value;
    this.setState({ [key]: updatedValue });
  }

  updateDebuff(event) {
    const key = event.target.value;
    const value = event.target.checked;

    if ((key === 'lifesteal' && !this.state.counter) || (key === 'counter' && !this.state.lifesteal)) {
      this.setState({ [key]: value });
    } else if (key === 'immunity') {
      this.setState({ [key]: value });
    }
  }

  editCharacter(event, isEditing) {
    event.stopPropagation();
    this.props.editChange(isEditing);
  }

  render() {
    return (
      <div className={`character-data-container ${this.props.isEditing ? 'character-edit' : ''}`} onClick={(e) => this.editCharacter(e, true)}>
        <div className="flex-container">
          {/* CHARACTER IMAGE */}
          <div className="character-selection-container">
            <img src={this.getCharacterImage()} alt="Character" />
          </div>

          {/* CHARACTER STAT LABELS */}
          <div className="character-stats-labels">
            <div className="character-stats-left">
              <span className="character-stat">
                <img src={artifact} alt="Artifact" />
                {this.getArtifactLabel()}
              </span>
              <span className="character-stat">
                <img src={hp} alt="Health Points" />
                {this.state.hp || '-'}
              </span>
              <span className="character-stat">
                <img src={speed} alt="Speed" />
                {this.state.speed || '-'}
              </span>
            </div>
            <div className="character-stats-right">
              <img src={counter} alt="Counter" hidden={!this.state.counter} />
              <img src={lifesteal} alt="Lifesteal" hidden={!this.state.lifesteal} />
              <img src={immunity} alt="Immunity" hidden={!this.state.immunity} />
            </div>
            <div className="character-stats-notes" hidden={this.props.isEditing}>
              {this.state.notes || ''}
            </div>
          </div>
        </div>

        {/* CHARACTER INPUTS */}
        <div className="flex-container" hidden={!this.props.isEditing}>
          <div className="character-options flex-1">

          </div>

          {/* CHARACTER SELECTION AND ARTIFACT */}
          <div className="flex-4">
            <div className="character-inputs">
              <div className="character-dropdowns flex-container">
                <div className="flex-1">
                  <Select
                    className="select-dropdown"
                    placeholder="Character"
                    options={this.props.options}
                    value={this.getSelectedCharacter()}
                    onChange={(e) => this.updateCharacterSelection(e.value)}
                  />
                </div>

                <div className="flex-1">
                  <Select
                    className="select-dropdown"
                    placeholder="Artifact"
                    options={this.artifactList}
                    value={this.getSelectedArtifact()}
                    onChange={(e) => this.updateCharacterData('artifact', e.value)}
                  />
                </div>
              </div>

              {/* CHARACTER DEBUFFS */}
              <div className="character-debuffs">
                <input type="checkbox" id="counter" value="counter" checked={this.state.counter} onChange={(e) => this.updateDebuff(e)} />
                <label htmlFor="counter"> Counter</label>
                <input type="checkbox" id="lifesteal" value="lifesteal" checked={this.state.lifesteal} onChange={(e) => this.updateDebuff(e)} />
                <label htmlFor="lifesteal"> Lifesteal</label>
                <input type="checkbox" id="immunity" value="immunity" checked={this.state.immunity} onChange={(e) => this.updateDebuff(e)} />
                <label htmlFor="immunity"> Immunity</label>
              </div>

              {/* CHARACTER INPUTS */}
              <div className="character-stats-inputs flex-container">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="HP"
                    pattern="/^-?\d+\.?\d*$/"
                    value={this.state.hp}
                    onChange={(e) => this.updateCharacterData('hp', e.target.value)}
                    onBlur={() => this.emitCharacterData()}>
                  </input>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Min Speed"
                    pattern="/^-?\d+\.?\d*$/"
                    value={this.state.speed}
                    onChange={(e) => this.updateCharacterData('speed', e.target.value)}
                    onBlur={() => this.emitCharacterData()}>
                  </input>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Max Speed"
                    pattern="/^-?\d+\.?\d*$/"
                    value={this.state.speed}
                    onChange={(e) => this.updateCharacterData('speed', e.target.value)}
                    onBlur={() => this.emitCharacterData()}>
                  </input>
                </div>
              </div>

              {/* CHARACTER NOTES */}
              <div className="character-notes-container">
                <textarea rows="2"
                  value={this.state.notes}
                  placeholder="Notes"
                  onChange={(e) => this.updateCharacterData('notes', e.target.value)}
                  onBlur={() => this.emitCharacterData()}>
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterData;
