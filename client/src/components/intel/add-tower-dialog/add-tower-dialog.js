import React from "react";
import "./add-tower-dialog.css";
import SelectSearch from "react-select-search";
import { socket, getPageId } from "globals/socket";

let towerName = "";
let towerLocation = "";

const towerLocations = [
  { name: "Bronze Fortress", value: "Bronze Fortess" },
  { name: "Dalberg Fortress", value: "Dalberg Fortress" },
  { name: "Silver Fortress", value: "Silver Fortress" },
  { name: "Stronghold", value: "Stronghold" },
];

const sendTowerData = (props) => {
  socket.emit("createTowerIntelData", {
    pageId: getPageId(),
    name: towerName,
    location: towerLocation,
  });
  props.onClose();
};

const AddTowerDialog = (props) => {
  if (props.visibility !== true) {
    return null;
  }
  return (
    <div className="modal-container">
      <div id="modal" className="modal">
        <input placeholder="Input tower name." className="input-box" onBlur={(e) => (towerName = e.target.value)}></input>
        <SelectSearch
          search
          options={towerLocations}
          placeholder="Choose Tower Location"
          onChange={(e) => (towerLocation = e)}
        />
        <button className="modal-button" onClick={() => sendTowerData(props)}>Add Tower</button>
      </div>
    </div>
  );
};

export default AddTowerDialog;
