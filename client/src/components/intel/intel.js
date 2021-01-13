import React, { useState } from "react";
import plus from "../../assets/plus.png";
import AddTowerDialog from "./add-tower-dialog/add-tower-dialog.js";
import "./intel.css";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:8080");
let socketTowerUpdateSuccess;
let socketTowerUpdateError;

const updateTowerData = (towerName, towerLocation) => {
  socket.emit('updateTower', { name: towerName, location: towerLocation });
}

const Intel = () => {
  const [isAddTowerDialogVisible, setAddTowerDialogVisiblity] = useState(false);

  if (socketTowerUpdateSuccess == null) {
    socketTowerUpdateSuccess = socket.on('towerUpdateSuccess', (data) => console.log(data));
  }

  if (socketTowerUpdateError == null) {
    socketTowerUpdateError = socket.on('towerUpdateError', (data) => console.log(data));
  }

  return (
    <div>
      <AddTowerDialog
        onClose={(name, location) => updateTowerData(name, location)}
        visibility={isAddTowerDialogVisible}
      />

      <button onClick={() => setAddTowerDialogVisiblity(true)}>
        <img
          src={plus}
          title="Add Tower"
          alt="Add Tower"
          className="plus-button"
        />
      </button>
    </div>
  );
};

export default Intel;
