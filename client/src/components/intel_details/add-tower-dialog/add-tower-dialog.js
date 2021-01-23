import React from "react";
import "./add-tower-dialog.css";
import Select from "react-select"
import { socket } from "globals/socket";

let towerName = "";
let towerLocation = "";

const towerLocations = [
  { value: "Bronze Fortress", label: "Bronze Fortess" },
  { value: "Dalberg Fortress", label: "Dalberg Fortress" },
  { value: "Silver Fortress", label: "Silver Fortress" },
  { value: "Stronghold", label: "Stronghold" },
];

const AddTowerDialog = (props) => {
  if (!props.visible) {
    return null;
  }

  const sendTowerData = () => {
    socket.emit("createTower", {
      pageId: props.intelID,
      name: towerName,
      location: towerLocation,
    });
    props.onClose();
  };

  return (
    <div className="modal-container">
      <div id="modal" className="modal">
        <Select
          search
          options={towerLocations}
          placeholder="Choose Tower Location"
          onChange={(e) => (towerLocation = e.value)}
        />
        <input placeholder="Input tower name" className="input-box" onBlur={(e) => (towerName = e.target.value)}></input>
        <button className="modal-button" onClick={sendTowerData}>Add Tower</button>
        <button className="modal-button" onClick={props.onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTowerDialog;
