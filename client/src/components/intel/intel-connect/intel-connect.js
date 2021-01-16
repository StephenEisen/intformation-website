import React from "react";
import { socket } from "globals/socket.js";
import './intel-connect.css';
import castle from 'assets/castle.png';
import map from 'assets/map.png';

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

const IntelConnect = (props) => {
  if (!props.visibility) {
    return null;
  }
  return (
    <section className="intel-connect">
      <div className="intel-connect-title">
        <h1>Create or Join Intel</h1>
      </div>

      <div className="intel-connect-container">
        <div className="intel-connect-container-left">
          <img src={castle} alt="Create New Intel" />
        </div>
        <div className="intel-connect-container-right">
          <p>
            Create a new intel id to share with your guild mates. All updates happen in real time and will remain saved
            for up to three days. You may, however, always see your records on the Statistics page.
            Click the button below to get started.
          </p>
          <div className="intel-connect-create">
            <a className="slide-btn" onClick={() => createNewIntel()}>
              <p>
                <span class="bg"></span><span class="base"></span>
                <span class="text">Create New Intel</span>
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className="intel-connect-container">
        <div className="intel-connect-container-left">
          <img src={map} alt="Join Existing Intel" />
        </div>
        <div className="intel-connect-container-right">
          <p>
            Already have an intel id? Type it in the input box below and click the join button below to see
            and update your on-going Guild War.
          </p>
          <div className="intel-connect-join">
            <span>Enter Intel Id:</span>
            <input className="intel-id-input" onBlur={(e) => (pageId = e.target.value)}></input>
            <a className="slide-btn" onClick={() => joinExistingIntel()}>
              <p>
                <span class="bg"></span><span class="base"></span>
                <span class="text">Join Existing Intel</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelConnect;
