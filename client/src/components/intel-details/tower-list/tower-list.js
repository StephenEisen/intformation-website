import React, { useState, useEffect } from "react";
import { socket } from 'globals/socket.js';
import AddTowerDialog from "../add-tower-dialog/add-tower-dialog.js";
import TowerData from "../tower-data/tower-data.js";
import "./tower-list.css";

const TowerList = (props) => {
  const [towerList, setTowerList] = useState(props.towerList);
  const [addTowerDialogVisible, setAddTowerDialogVisible] = useState(false);

  // Update tower list when a new tower is added
  const updateTowerList = (intel) => {
    setTowerList(intel.data);
  }

  // Show or hide the add tower dialog
  const toggleAddTowerDialog = (isVisible) => {
    setAddTowerDialogVisible(isVisible);
  }

  // Logic to run when this component is rendered for the first time
  useEffect(() => {
    socket.on("createTowerSuccess", updateTowerList);
    socket.on("updateCharacterSuccess", updateTowerList);

    return () => {
      socket.off("createTowerSuccess", updateTowerList);
      socket.off("updateCharacterSuccess", updateTowerList);
    }
  }, []);

  // Render all the tower data
  return (
    <section>
      {/* ADD NEW TOWER */}
      <AddTowerDialog
        visible={addTowerDialogVisible}
        intelId={props.intelId}
        onClose={() => toggleAddTowerDialog(false)}
      />
      <button className="slide-btn-horizontal" onClick={() => toggleAddTowerDialog(true)}>
        <span className="slide-btn-text">Add Tower</span>
      </button>

      {/* SHOW ALL TOWER INFO */}
      {
        towerList.length > 0
          ? towerList.map((tower, index) => <TowerData key={index} towerIndex={index} intelId={props.intelId} towerData={tower} />)
          : null
      }
    </section>
  )
}

export default TowerList;
