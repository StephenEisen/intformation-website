import React, { useState } from "react";
import "./character-info.css";
import hp from "assets/icons/hp.png";
import speed from "assets/icons/speed.png";
import notes from "assets/icons/notes.png";
import artifact from "assets/icons/artifact.png";

const updateStat = (key, value, props, state, setState) => {
  setState((prevState) => ({
    ...prevState,
    [key]: value,
  }));
  props.updateStats(state)
};

const CharacterInfo = (props) => {
  const [state, setState] = useState({
    hp: null,
    speed: null,
    artifact: null,
    notes: null,
  });

  return (
    <div className="character-info-container" disabled={props.disabled}>
      <div className="character-info">
        <label className="input-label">
          <img src={hp} alt="" />
        </label>
        <input
          type="number"
          placeholder="Health Points"
          onBlur={(e) => {
            updateStat("hp", e.target.value, props, state, setState);
          }}
        ></input>
      </div>

      <div className="character-info">
        <label className="input-label">
          <img src={speed} alt="" />
        </label>
        <input type="number" placeholder="Speed"></input>
      </div>

      <div className="character-info">
        <label className="input-label">
          <img src={artifact} alt="" />
        </label>
        <input type="text" placeholder="Artifact"></input>
      </div>

      <div className="character-info">
        <label className="input-label">
          <img src={notes} alt="" />
        </label>
        <input type="text" placeholder="Notes"></input>
      </div>
    </div>
  );
};

export default CharacterInfo;
