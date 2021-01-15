import React, { useState } from "react";
import plus from "../../assets/plus.png";
import AddTowerDialog from "./add-tower-dialog/add-tower-dialog.js";
import "./intel.css";
import TowerInfo from "./tower-info/tower-info.js";
import IntelTowerDialog from "./intel-creation-dialog/intel-tower-dialog";
import { socket, getPageId } from "globals/socket.js";

let pageId = "";
let socketCreateNewGuildDataSuccess;

let socketTowerUpdateSuccess;
let socketTowerUpdateError;

const updateTowerData = (id, towerName, towerLocation) => {
  socket.emit("createTowerData", {
    pageId: id,
    name: towerName,
    location: towerLocation,
  });
};

const Intel = (props) => {
  const [isAddTowerDialogVisible, setAddTowerDialogVisiblity] = useState(false);
  const [isTowerInfoVisible, setTowerInfoVisibility] = useState(false);
  let [isIntelTowerDialogVisible, setIntelTowerDialogVisibility] = useState(false);
  
  // Dont fucking touch
  if (pageId == null){
    isIntelTowerDialogVisible = true;
  }

  pageId = getPageId();

  if (socketTowerUpdateSuccess == null) {
    socketTowerUpdateSuccess = socket.on("createTowerDataSuccess", (data) => {
      setTowerInfoVisibility(true);
    });
  }

  if (socketTowerUpdateError == null) {
    socketTowerUpdateError = socket.on("createTowerDataError", (data) =>
      console.log(data)
    );
  }

  // socket.on('findExistingGuildDataSuccess', (data) => {
    
  // })

  if (socketCreateNewGuildDataSuccess == null) {
    socketCreateNewGuildDataSuccess = socket.on(
      "createGuildDataSuccess",
      (data) => {
        props.history.push('/intel/' + data.pageId);
        //window.history.replaceState(null, null, "/intel/" + data.pageId);
        setIntelTowerDialogVisibility(false);
      }
    );
  }

  return (
    <div>
      {/* create new intel sheet or import existing sheet onClose */}
      <IntelTowerDialog visibility={isIntelTowerDialogVisible} />

      <AddTowerDialog
        onClose={(id, name, location) => {
          updateTowerData(id, name, location);
          setAddTowerDialogVisiblity(false);
        }}
        visibility={isAddTowerDialogVisible}
        pageId={pageId}
      />
      <TowerInfo visibility={isTowerInfoVisible} />
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
