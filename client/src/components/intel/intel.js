import React, { useEffect, useState } from "react";
import { socket, getPageId } from "globals/socket.js";
import "./intel.css";

import IntelConnect from "./intel-connect/intel-connect";
import TowerDisplay from "./tower-display/tower-display";

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
  setState((prevState) => ({ ...prevState, towerData: data.data }));
};

const Intel = () => {
  const [state, setState] = useState({
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
    socket.on("updateCharacterSuccess", updateIntelHandler);

    return () => {
      socket.off("createIntelSuccess", createIntelHandler);
      socket.off("findIntelSuccess", findIntelHandler);
      socket.off("createTowerSuccess", updateIntelHandler);
      socket.off("updateCharacterSuccess", updateIntelHandler);
    };
  }, []);

  return (
    <div>
      {/* CREATE OR JOIN INTEL */}
      <IntelConnect visible={state.isIntelConnectVisible}/>
      <TowerDisplay visible={!state.isIntelConnectVisible} towerData={state.towerData}/>
    </div>
  );
};

export default Intel;
