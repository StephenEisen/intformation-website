import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { intelPost } from 'globals/api.js';
import castle from 'assets/icons/castle.png';
import map from 'assets/icons/map.png';
import './intel.css';

const Intel = () => {
  const history = useHistory();
  const [pageId, setPageID] = useState('');

  const recentIntels = JSON.parse(localStorage.getItem('recentIntels')) || [];

  const createIntelHandler = () => {
    // TODO: Let's eventually show some kind of toast for error
    intelPost().then(i => history.push(`/intel/${i.pageId}`)).catch(e => console.log(e));
  };

  const joinIntelHandler = async () => {
    history.push(`/intel/${pageId}`);
  };

  return (
    <section className="intel-connect">
      <div className="intel-connect-title">
        <h1>Create or Join Intel</h1>
      </div>

      {/* CREATE INTEL */}
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
            <button className="slide-btn-horizontal" onClick={createIntelHandler}>
              <span className="slide-btn-text">Create New Intel</span>
            </button>
          </div>
        </div>
      </div>

      {/* JOIN INTEL */}
      <div className="container intel-join-container">
        <div className="intel-join-action">
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
                onChange={e => setPageID(e.target.value)}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    joinIntelHandler()
                  }
                }}
                placeholder="Enter intel id...">
              </input>
              <button className="slide-btn-horizontal" onClick={joinIntelHandler}>
                <span className="slide-btn-text">Join Existing Intel</span>
              </button>
            </div>
          </div>
        </div>

        {/* RECENT INTELS */}
        {
          recentIntels.length > 0
            ? (
              <div className="intel-join-recents">
                <p className="intel-join-recents-title">Recent Intels</p>
                <ul className="intel-connect-recents-list">
                  {recentIntels.map((pageId) =>
                    <li key={pageId}>
                      <NavLink to={`/intel/${pageId}`}>{pageId}</NavLink>
                    </li>
                  )}
                </ul>
              </div>
            )
            : null
        }
      </div>
    </section>
  );
};

export default Intel;
