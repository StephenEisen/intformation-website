import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "globals/socket.js";

import './intel_details.css'
import TowerDisplay from "./tower-display/tower-display";

const IntelDetails = props => {
  const { id } = useParams();
  const [towerData, setTowerData] = useState([]);

  const localStoragePushIntel = () => {
    const recents = JSON.parse(localStorage.getItem("recentIntels")) || [];
    const filtered = recents.filter(el => el !== id);
    filtered.unshift(id);
    const updated = filtered.slice(0, 10);
    localStorage.setItem("recentIntels", JSON.stringify(updated));
  }

  // We should consider changing create tower and find intel to api calls
  // It would allow us to avoid these socket.off calls
  const findIntelSuccess = data => {
    setTowerData(data.data);
    localStoragePushIntel();
  }

  const createTowerSuccess = data => {
    setTowerData(data.data);
  }

  useEffect(() => {
    socket.on("findIntelSuccess", findIntelSuccess);
    socket.on("createTowerSuccess", createTowerSuccess);
    socket.emit("findIntel", id);

    return () => {
      socket.off("findIntelSuccess", findIntelSuccess);
      socket.off("createTowerSuccess", createTowerSuccess);
    }

  // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      <TowerDisplay intelID={id} towerData={towerData} />
    </div>
  )
}

export default IntelDetails;
