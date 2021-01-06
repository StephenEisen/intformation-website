import React from "react";
import "./AddTowerDialog.css";
import SelectSearch from 'react-select-search';

const towerOptions = [
    {name: 'Bronze Fortress', value: 'Bronze Fortess'},
    {name: 'Dalberg Fortress', value: 'Dalberg Fortress'},
    {name: 'Silver Fortress', value: 'Silver Fortress'},
    {name: 'Stronghold', value: 'Stronghold'}
];

const AddTowerDialog = (props) => {
  if (props.visibility !== true) {
    return null;
  }
  return (
    <div className="modal-container">
      <div id="modal" className="modal">
        <input></input>
        <SelectSearch
            search
            options={towerOptions} 
            placeholder="Choose Tower Location" />
        <button onClick={(e) => props.onClose()}>Add Tower</button>
      </div>
    </div>
  );
};

export default AddTowerDialog;
