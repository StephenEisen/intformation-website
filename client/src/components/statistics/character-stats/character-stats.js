import React from "react";
import StatsChart from "../stats-chart/stats-chart.js";
import { CharacterImages } from "globals/images.js";
import "./character-stats.css";

class CharacterStats extends React.Component {
  getCharKey(characterIndex) {
    return this.props.teamData.teamKey.split(":")[characterIndex] || "Enott";
  }

  getArtifactData(characterIndex) {
    const characterKey = this.getCharKey(characterIndex);
    return this.props.teamData[characterKey];
  }

  getMostUsedArtifact(characterKey) {
    const artifacts = this.props.teamData[characterKey];
    let mostUsed = 0;
    let artifactName = "";

    for (const key in artifacts) {
      const artifactCounter = artifacts[key].artifactCounter;

      if (mostUsed < artifactCounter) {
        mostUsed = artifactCounter;
        artifactName = key;
      }
    }
    return artifactName;
  }

  openStats() {
    if (this.props.onTeamClick) {
      this.setState({ isStatsOpen: true });
      this.props.onTeamClick(this.props.teamData.teamKey);
    }
  }

  getCharacterImageElements() {
    const elements = [];

    for (let i = 0; i < 3; i++) {
      const characterKey = this.getCharKey(i);
      elements.push(
        <div key={i} className="character-stats-column">
          <img
            alt=""
            width="62"
            height="62"
            src={CharacterImages[characterKey]}
          />
          <p>{characterKey}</p>
        </div>
      );
    }

    return elements;
  }

  getUsedTeamElements(){
    let element;
    const charactersUsed = this.props.teamData.charactersUsed;

    if (charactersUsed.length > 0){
        element = (
          <div className="character-stats characters-used container">
            <div className="characters-used-header">
              <h2>
                Common teams used against:
              </h2>
              <span>
                {this.props.teamData.teamKey.replace(/:/g, ", ")}
              </span>
            </div>
            <div className="characters-used-grid">
              <span className="column-title">Team</span>
              <span className="column-title">Winrate</span>
            </div>
          {charactersUsed.map((team, teamIndex) => (
            <div key={team.teamKey}>
              <div className="characters-used-grid">
                <div className="characters-used-row">
                {charactersUsed[teamIndex].teamKey.split(":").map((char) => (
                  <div className="characters-used-column" key={char}>
                    <div>
                      <img alt="" width="62" height="62" src={CharacterImages[char]}/>
                    </div>
                    {char}
                  </div>
                ))}
                </div>
                <div className="winrate-bar">
                  <div>{team.winrate}%</div>
                  <span style={{ width: team.winrate + "%" }}> </span>
                </div>
              </div>
            </div>
          ))}
          </div>)
      }
    return element;
  }

  getStatsElements() {
    const elements = [];
    const cssAnimationClasses = [
      "first-most-used slider-left",
      "second-most-used slider-right character-stats-reverse-grid",
      "third-most-used slider-left",
    ];

    for (let i = 0; i < 3; i++) {
      const characterKey = this.getCharKey(i);
      const mostUsedArtifactName = this.getMostUsedArtifact(characterKey);
      const mostUsedArtifact = this.props.teamData[characterKey][mostUsedArtifactName];
      const elementKey = `${this.props.teamData.teamKey}-${characterKey}`;

      if (Object.keys(this.props.teamData[characterKey]).length > 0) {
        elements.push(
          <div
            key={elementKey}
            className={`${cssAnimationClasses[i]} slide-in`}
          >
            <div>
              <h2>Most Commonly Used Stats On: {characterKey}</h2>
              <p className="statistics-slide-up-artifact statistics-slide-stats">
                Artifact: {mostUsedArtifactName}
              </p>
              <p className="statistics-slide-up-hp statistics-slide-stats">
                Hp: {mostUsedArtifact.hpAverage}
              </p>
              <p className="statistics-slide-up-speed statistics-slide-stats">
                Speed: {mostUsedArtifact.speedAverage}
              </p>
            </div>
            <div>
              <StatsChart artifactData={this.props.teamData[characterKey]} />
            </div>
          </div>
        );
      }
    }

    return elements;
  }

  render() {
    if (this.props.hidden) {
      return null;
    }

    return (
      <div>
        <div
          className={`character-stats-row ${this.props.showStats ? "" : "character-stats-row-top"}`}
          onClick={() => this.openStats()}>
          {this.getCharacterImageElements()}
        </div>
        {this.props.showStats ? this.getStatsElements() : null}
        {this.props.showStats ? this.getUsedTeamElements() : null}
      </div>
    );
  }
}

export default CharacterStats;
