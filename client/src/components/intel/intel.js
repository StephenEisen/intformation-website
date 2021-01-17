import React, { useEffect, useState } from "react";
import { socket, getPageId } from "globals/socket.js";
import "./intel.css";
import plus from "../../assets/plus.png";
import AddTowerDialog from "./add-tower-dialog/add-tower-dialog.js";
import TowerInfo from "./tower-info/tower-info.js";
import IntelConnect from "./intel-connect/intel-connect";

const createIntel = (data, setState) => {
  window.history.pushState(data.pageId, "", "/intel/" + data.pageId);
  setState(prevState => ({ ...prevState, isIntelConnectVisible: false }));
};

const findIntel = (data, setState) => {
  window.history.pushState(data.pageId, "", "/intel/" + data.pageId);
  setState(prevState => ({
    ...prevState,
    isIntelConnectVisible: false,
    towerData: data.data
  }));
};

const updateIntel = (data, setState) => {
  setState(prevState => ({ ...prevState, towerData: data.data }));
}

const Intel = () => {
  const [state, setState] = useState({
    isAddTowerDialogVisible: false,
    isIntelConnectVisible: true,
    towerData: []
  });

  useEffect(() => {
    if (getPageId() != null) {
      socket.emit("findIntel", getPageId());
    }

    const createIntelHandler = (data) => { createIntel(data, setState) };
    const findIntelHandler = (data) => { findIntel(data, setState) };
    const updateIntelHandler = (data) => { updateIntel(data, setState) };

    socket.on("createIntelSuccess", createIntelHandler);
    socket.on("findIntelSuccess", findIntelHandler);
    socket.on("createTowerSuccess", updateIntelHandler);

    return () => {
      socket.off("createIntelSuccess", createIntelHandler);
      socket.off("findIntelSuccess", findIntelHandler);
      socket.off("createTowerSuccess", updateIntelHandler);
    };
  }, []);

  return (
    <div>
      {/* CREATE OR JOIN INTEL */}
      <IntelConnect visible={state.isIntelConnectVisible} />

      {/* ADD NEW TOWER */}
      <AddTowerDialog
        onClose={() => setState({ ...state, isAddTowerDialogVisible: false })}
        visible={state.isAddTowerDialogVisible}
      />
      <button onClick={() => setState({ ...state, isAddTowerDialogVisible: true })}>
        <img src={plus} title="Add Tower" alt="Add Tower" className="plus-button" />
      </button>

      {/* SHOW ALL TOWER INFO */}
      {
        state.towerData.length
          ? state.towerData.map((tower) => <TowerInfo key={tower.name} tower={tower} />)
          : null
      }
    </div>
  );
};

export default Intel;
