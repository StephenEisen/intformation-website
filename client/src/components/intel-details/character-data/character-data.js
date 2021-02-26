import React from 'react';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { socket } from 'globals/socket';
import { CharacterImages } from 'globals/images';
import { clone } from 'globals/utils';
import { sanitizeObject } from 'globals/validation';
import SpeedCalcDialog from '../speed-calc-dialog/speed-calc-dialog.js';
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
    this.maxLengths = { hp: 5, minSpeed: 3, maxSpeed: 3, notes: 150 };
    this.artifactList = clone(require('data/artifacts.json'));

    this.state = {
      name: props.character.name,
      hp: props.character.hp || '',
      minSpeed: props.character.minSpeed || '',
      maxSpeed: props.character.maxSpeed || '',
      artifact: props.character.artifact || '',
      notes: props.character.notes || '',
      counter: props.character.counter || false,
      lifesteal: props.character.lifesteal || false,
      immunity: props.character.immunity || false,
      isSpeedCalcVisible: false
    };
  }

  emitCharacterData() {
    const sanitizedState = sanitizeObject(this.state);

    socket.emit('updateCharacter', {
      pageId: this.props.pageId,
      team: this.props.teamIndex,
      towerId: this.props.towerData._id,
      towerLocation: this.props.towerData.location,
      towerName: this.props.towerData.name,
      characterIndex: this.props.characterIndex,
      ...sanitizedState
    });

    this.setState({ ...sanitizedState });
  }

  getCharacterImage() {
    return CharacterImages[this.state.name] || CharacterImages['Enott'];
  }

  getSelectedCharacter() {
    return this.props.options.find((character) => character.value === this.state.name);
  }

  getCharacterSpeed() {
    if (this.state.minSpeed || this.state.maxSpeed) {
      const separator = this.state.minSpeed && this.state.maxSpeed ? '-' : '';
      return `${this.state.minSpeed}${separator}${this.state.maxSpeed}`;
    }

    return '-';
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

  updateCharacterArtifact(option) {
    this.setState({ artifact: option }, () => this.emitCharacterData());
  }

  updateCharacterData(key, value) {
    const maxLength = this.maxLengths[key];
    const updatedValue = value.length > maxLength ? value.slice(0, maxLength) : value;
    this.setState({ [key]: updatedValue });
  }

  updateBuff(event) {
    const key = event.target.value;
    const value = event.target.checked;

    if ((key === 'lifesteal' && !this.state.counter) || (key === 'counter' && !this.state.lifesteal)) {
      this.setState({ [key]: value }, this.emitCharacterData);
    } else if (key === 'immunity') {
      this.setState({ [key]: value }, this.emitCharacterData);
    }
  }

  toggleSpeedCalculationDialog = (isVisible) => {
    this.setState({isSpeedCalcVisible: isVisible});
  }

  updateSpeedFromCalculation = (minSpeed, maxSpeed) => {
    if (minSpeed > 0 && maxSpeed > 0){
      this.setState({minSpeed, maxSpeed}, () => this.emitCharacterData());
    }
    this.toggleSpeedCalculationDialog(false);
  }

  toggleEditCharacter(event, isEditing) {
    event.stopPropagation();
    this.props.editChange(isEditing);
  }

  render() {
    return (
      <div className={`character-data-container ${this.props.isEditing ? 'character-edit' : ''}`} onClick={(e) => this.toggleEditCharacter(e, true)}>
        <div className="flex-container">
          {/* CHARACTER IMAGE */}
          <div className="character-selection-container">
            <img src={this.getCharacterImage()} alt="Character" />
          </div>

          {/* CALCULATE SPEED*/}
          {
            this.state.isSpeedCalcVisible
              ? <SpeedCalcDialog
                onClose={(a, b) => this.updateSpeedFromCalculation(a, b)}
              />
              : null
          }

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
                {this.getCharacterSpeed()}
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
            <button className="center-underline-btn" onClick={(e) => this.toggleEditCharacter(e, false)}>
              <FontAwesomeIcon icon={faLock} /> Close
            </button>
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
                    onChange={(e) => this.updateCharacterArtifact(e.value)}
                  />
                </div>
              </div>

              {/* CHARACTER BUFFS */}
              <div className="character-buffs">
                <input
                  type="checkbox"
                  id={`counter-t${this.props.towerIndex}-c${this.props.characterIndex}`}
                  value="counter"
                  checked={this.state.counter}
                  onChange={(e) => this.updateBuff(e)} />
                <label htmlFor={`counter-t${this.props.towerIndex}-c${this.props.characterIndex}`}> Counter</label>

                <input
                  type="checkbox"
                  id={`lifesteal-t${this.props.towerIndex}-c${this.props.characterIndex}`}
                  value="lifesteal"
                  checked={this.state.lifesteal}
                  onChange={(e) => this.updateBuff(e)} />
                <label htmlFor={`lifesteal-t${this.props.towerIndex}-c${this.props.characterIndex}`}> Lifesteal</label>

                <input
                  type="checkbox"
                  id={`immunity-t${this.props.towerIndex}-c${this.props.characterIndex}`}
                  value="immunity"
                  checked={this.state.immunity}
                  onChange={(e) => this.updateBuff(e)} />
                <label htmlFor={`immunity-t${this.props.towerIndex}-c${this.props.characterIndex}`}> Immunity</label>
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
                    value={this.state.minSpeed}
                    onChange={(e) => this.updateCharacterData('minSpeed', e.target.value)}
                    onBlur={() => this.emitCharacterData()}>
                  </input>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Max Speed"
                    pattern="/^-?\d+\.?\d*$/"
                    value={this.state.maxSpeed}
                    onChange={(e) => this.updateCharacterData('maxSpeed', e.target.value)}
                    onBlur={() => this.emitCharacterData()}>
                  </input>
                </div>
                <div className="calculate-btn">
                  <button className="slide-btn-horizontal" onClick={() => this.toggleSpeedCalculationDialog(true)}>
                    <span className="slide-btn-text">Calculate Speed</span>
                  </button>
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
