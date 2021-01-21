import React, { useState } from "react";
import { socket } from "globals/socket.js";
import './intel-connect.css';
import castle from 'assets/castle.png';
import map from 'assets/map.png';

const IntelConnect = (props) => {
  const [pageId, setPageId] = useState("");

  const createNewIntel = () => {
    socket.emit("createIntel");
  };

  const joinExistingIntel = () => {
    socket.emit("findIntel", pageId);
  };

  if (!props.visible) {
    return null;
  }

  return (
    <section className="intel-connect">
      <div className="intel-connect-title">
        <h1>Create or Join Intel</h1>
      </div>

      <div className="container">
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
            <button className="slide-btn-horizontal" onClick={createNewIntel}>
              <span className="slide-btn-text">Create New Intel</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="intel-connect-container-left">
          <img src={map} alt="Join Existing Intel" />
        </div>
        <div className="intel-connect-container-right">
          <p>
            Already have an intel id? Type it in the input box below and click the join button below to see
            and update your on-going Guild War.
          </p>
          <div className="intel-connect-join">
            <input
              className="intel-id-input"
              type="text"
              onChange={e => setPageId(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  joinExistingIntel()
                }
              }}
              placeholder="Enter intel id...">
            </input>
            <button className="slide-btn-horizontal" onClick={joinExistingIntel}>
              <span className="slide-btn-text">Join Existing Intel</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelConnect;
