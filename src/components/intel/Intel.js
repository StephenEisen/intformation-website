import React, { useState } from "react";
import plus from "../../plus.png";
import AddTowerDialog from "./AddTowerDialog";
import "./Intel.css";

const Intel = () => {
  const [isAddTowerDialogVisible, setAddTowerDialogVisiblity] = useState(false);
  return (
    <div>
      <AddTowerDialog
        onClose={() => setAddTowerDialogVisiblity(false)}
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
