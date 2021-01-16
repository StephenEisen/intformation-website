import React, { useState } from "react";
import plus from "../../assets/plus.png";
import AddTowerDialog from "./add-tower-dialog/add-tower-dialog.js";
import "./intel.css";
import TowerInfo from "./tower-info/tower-info.js";
import IntelConnect from "./intel-connect/intel-connect";
import { socket, getPageId } from "globals/socket.js";

let towerList = [];

let pageId = "";
let socketCreateNewGuildDataSuccess;

let socketFindNewGuildDataSuccess;

let socketTowerCreateSuccess;
let socketTowerCreateError;

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

  if (socketTowerCreateSuccess == null) {
    socketTowerCreateSuccess = socket.on("createTowerDataSuccess", (data) => {
      setTowerInfoVisibility(true);
    });
  }

  if (socketTowerCreateError == null) {
    socketTowerCreateError = socket.on("createTowerDataError", (data) =>
      console.log(data)
    );
  }

  if (socketFindNewGuildDataSuccess == null){
    socketFindNewGuildDataSuccess = socket.on('findExistingGuildDataSuccess', (data) => {
      towerList = data;
    })
  }

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
      <IntelConnect visibility={isIntelTowerDialogVisible} />

      <AddTowerDialog
        onClose={(id, name, location) => {
          updateTowerData(id, name, location);
          setAddTowerDialogVisiblity(false);
        }}
        visibility={isAddTowerDialogVisible}
        pageId={pageId}
      />
      {
        towerList.length ?
        towerList.map((tower) => <TowerInfo visibility={isTowerInfoVisible} />) : null
      }


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
