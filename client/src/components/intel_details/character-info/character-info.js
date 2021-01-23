import React, { useState } from "react";
import "./character-info.css";
import hp from "assets/icons/hp.png";
import speed from "assets/icons/speed.png";
import notes from "assets/icons/notes.png";
import artifact from "assets/icons/artifact.png";
import { socket } from "globals/socket";
import { useParams } from "react-router-dom";



const CharacterInfo = (props) => {
  const { id } = useParams();

  const [state, setState] = useState({
    hp: props.characterData.hp || '',
    speed: props.characterData.speed || '',
    artifact: props.characterData.artifact || '',
    notes: props.characterData.notes || '',
  });

  const updateStat = () => {
    socket.emit("updateCharacter", {
      ...props.characterData,
      ...state,
      pageId: id
    });
  };

  return (
    <div className="character-info-container" disabled={props.disabled}>
      <div className="character-info">
        <label className="input-label">
          <img src={hp} alt="" />
        </label>
        <input
          type="number"
          placeholder="Health Points"
          value={state.hp}
          onChange={(e) => setState({ ...state, hp: e.target.value })}
          onBlur={(e) => updateStat()}
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
