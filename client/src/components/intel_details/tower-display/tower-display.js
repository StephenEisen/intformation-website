import React, { useState } from "react";
import "./tower-display.css";
import AddTowerDialog from "../add-tower-dialog/add-tower-dialog.js";
import plus from "assets/plus.png";
import TowerInfo from "../tower-info/tower-info.js";

const TowerDisplay = (props) => {
  const [state, setState] = useState({ isAddTowerDialogVisible: false });

  return (
    <div>
      {/* ADD NEW TOWER */}
      <AddTowerDialog
        onClose={() => setState({ ...state, isAddTowerDialogVisible: false })}
        visible={state.isAddTowerDialogVisible}
        intelID={props.intelID}
      />

      <button
        onClick={() => setState({ ...state, isAddTowerDialogVisible: true })}
      >
        <img
          src={plus}
          title="Add Tower"
          alt="Add Tower"
          className="plus-button"
        />
      </button>

      {/* SHOW ALL TOWER INFO */}
      {props.towerData.length
        ? props.towerData.map((tower, index) => (
          <TowerInfo key={tower.name} tower={tower} towerIndex={index} />
        ))
        : null}
    </div>
  );
};

export default TowerDisplay;
