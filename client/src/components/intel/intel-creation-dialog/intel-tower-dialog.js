import React from "react";
import { socket } from "globals/socket.js";

let pageId = "";

const createNewIntel = () => {
  socket.emit("createGuildData", {
    pageId: Math.random().toString(36).slice(2),
  });
};

const joinExistingIntel = () => {
  socket.emit("findExistingGuildData", {
    pageId: pageId,
  });
};

const IntelTowerDialog = (props) => {
  if (!props.visibility) {
    return null;
  }
  return (
    <div className="intel-creation">
      <button
        className="intel-creation-button"
        onClick={() => createNewIntel()}
      >
        Create New Intel
      </button>

      <button className="intel-join-button" onClick={() => joinExistingIntel()}>
        Join Existing Intel
      </button>

      <input
        className="intel-join-input"
        placeholder="Enter link or code."
        onBlur={(e) => (pageId = e.target.value)}
      ></input>
    </div>
  );
};

export default IntelTowerDialog;
