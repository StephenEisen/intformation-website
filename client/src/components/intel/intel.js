import React, { useEffect, useState } from "react";
import plus from "../../assets/plus.png";
import AddTowerDialog from "./add-tower-dialog/add-tower-dialog.js";
import "./intel.css";
import TowerInfo from "./tower-info/tower-info.js";
import IntelConnect from "./intel-connect/intel-connect";
import { socket, getPageId } from "globals/socket.js";

let towerList = [];

let towerCount = 0;

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
  // towerList.unshift(towerName);
};

const createIntelData = (props, data, setState) => {
  props.history.push("/intel/" + data.pageId);
  setState(prevState => { return {...prevState ,isIntelTowerDialogVisible: false }});
}

const Intel = (props) => {
  const [state, setState] = useState({
    isAddTowerDialogVisible: false,
    isTowerInfoVisible: false,
    isIntelTowerDialogVisible: true,
    towerCount: 0,
  });

  useEffect(() => {
    const handler = (data) => {createIntelData(props, data, setState)}
    socket.on("createGuildDataSuccess", handler);
    return () => {
      socket.off("createGuildDataSuccess", handler);
    };
  }, []);

  // // Dont fucking touch
  // if (pageId == null){
  //   state.isIntelTowerDialogVisible = true;
  // }

  pageId = getPageId();

  // if (socketTowerCreateSuccess == null) {
  //   socketTowerCreateSuccess = socket.on("createTowerDataSuccess", (data) => {
  //     towerList = data;
  //     setState({ ...state, towerCount: state.towerCount + 1 });
  //   });
  // }

  // if (socketTowerCreateError == null) {
  //   socketTowerCreateError = socket.on("createTowerDataError", (data) =>
  //     console.log(data)
  //   );
  // }

  // if (socketFindNewGuildDataSuccess == null) {
  //   socketFindNewGuildDataSuccess = socket.on(
  //     "findExistingGuildDataSuccess",
  //     (data) => {
  //       towerList = data;
  //     }
  //   );
  // }

  // if (socketCreateNewGuildDataSuccess == null) {
  //   socketCreateNewGuildDataSuccess = socket.on(
  //     "createGuildDataSuccess",
  //     (data) => {
  //       props.history.push('/intel/' + data.pageId);
  //       //window.history.replaceState(null, null, "/intel/" + data.pageId);
  //       //setIntelTowerDialogVisibility(false);
  //       setState({...state, isIntelTowerDialogVisible: false});
  //     }
  //   );
  // }

  return (
    <div>
      <IntelConnect visibility={state.isIntelTowerDialogVisible} />

      <AddTowerDialog
        onClose={(id, name, location) => {
          updateTowerData(id, name, location);
          setState({ ...state, isAddTowerDialogVisible: false });
        }}
        visibility={state.isAddTowerDialogVisible}
        pageId={pageId}
      />
      {/* {
        towerList.length ?
        towerList.map((tower) => <TowerInfo  towerName={tower.name} visibility={isTowerInfoVisible} />) : null
      } */}

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
    </div>
  );
};

export default Intel;
