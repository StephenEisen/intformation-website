import React, { useEffect, useState } from "react";
import plus from "../../assets/plus.png";
import AddTowerDialog from "./add-tower-dialog/add-tower-dialog.js";
import "./intel.css";
import TowerInfo from "./tower-info/tower-info.js";
import IntelConnect from "./intel-connect/intel-connect";
import { socket, getPageId } from "globals/socket.js";

const createIntelData = (data, setState) => {
  window.history.pushState(data.pageId, "", "/intel/" + data.pageId);
  setState(prevState => ({...prevState ,isIntelConnectVisible: false }));
};

const findIntelData = (data, setState) => {
  console.log(data);
  window.history.pushState(data.pageId, "", "/intel/" + data.pageId);
  setState(prevState => ({
    ...prevState ,
    isIntelConnectVisible: false,
    towerData: data.data 
  }));
};

const updateIntelData = (data, setState) => {
  console.log(data);
  setState(prevState => ({
    ...prevState ,
    towerData: data.data 
  }));
}

const Intel = () => {
  const [state, setState] = useState({
    isAddTowerDialogVisible: false,
    isIntelConnectVisible: true,
    towerData: []
  });

  useEffect(() => {
    if(getPageId() != null){
      socket.emit("findExistingGuildData", getPageId());
    }

    const createIntelHandler = (data) => {createIntelData( data, setState)};
    const findIntelHandler = (data) => {findIntelData(data, setState)};
    const updateIntelDataHandler = (data) => {updateIntelData(data, setState)};

    socket.on("createGuildDataSuccess", createIntelHandler);
    socket.on("findExistingGuildDataSuccess", findIntelHandler);
    socket.on("updateIntelDataSuccess", updateIntelDataHandler);

    return () => {
      socket.off("createGuildDataSuccess", createIntelHandler);
      socket.off("findExistingGuildDataSuccess", findIntelHandler);
      socket.off("updateIntelDataSuccess", updateIntelDataHandler);
    };
  }, []);

  return (
    <div>
      <IntelConnect visibility={state.isIntelConnectVisible} />

      {/* <TowerContext.Provider value={state.towerData}> */}
      {
        state.towerData.length 
          ? state.towerData.map((tower) => <TowerInfo  key={tower.name} tower={tower} />) 
          : null
      }
      {/* </TowerContext.Provider> */}

      <AddTowerDialog
        onClose={() => {
          setState({ ...state, isAddTowerDialogVisible: false });
        }}
        visibility={state.isAddTowerDialogVisible}
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
    </div>
  );
};

export default Intel;
