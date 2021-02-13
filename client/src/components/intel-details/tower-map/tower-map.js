import React, { useState } from 'react';
import { socket } from 'globals/socket.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import stronghold from 'assets/towers/stronghold.png';
import bronzeTower from 'assets/towers/bronze.png';
import silverTower from 'assets/towers/silver.png';
import dalbergTower from 'assets/towers/dalberg.png';
import defaultTower from 'assets/towers/tower.png';
import './tower-map.css';

// Constants
const ALL_TOWERS = 'All';
const STRONGHOLD = 'Stronghold';
const BRONZE = 'Bronze Fortress';
const DALBERG = 'Dalberg Fortress';
const SILVER = 'Silver Fortress';

const towerLocations = {
  [STRONGHOLD]: { img: stronghold },
  [BRONZE]: { img: bronzeTower },
  [DALBERG]: { img: dalbergTower },
  [SILVER]: { img: silverTower }
};

// Component
const TowerMap = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentName, setCurrentName] = useState(null);
  const [showChildren, setShowChildren] = useState(false);

  const changeTower = (towerLocation, towerName) => {
    /**
     * Need to emit instead of filtering on client. If you filter by towerList on the UI then
     * any changes the user makes to a character will be lost when they change to a different
     * tower. This is because when a character update happens, we broadcast a socket event (We
     * need to broadcast so the client doesn't lose focus when switching to a different input).
     * Thus, the "towerListUpdate" is never called. This solution seems to work pretty well.
     */
    socket.emit('filterTower', { pageId: props.pageId, towerLocation, towerName });

    setCurrentLocation(towerLocation);
    setCurrentName(towerName);
    setShowChildren(towerLocation !== STRONGHOLD && towerLocation !== ALL_TOWERS);
  }

  const getRootTower = () => {
    if (showChildren) {
      return towerLocations[currentLocation].img;
    }
  }

  const resetSelection = () => {
    changeTower(ALL_TOWERS);
  }

  return (
    <section className="tower-map container">
      <div className="flex-container">
        <div className="tower-info flex-2">
          <h2>Tower Map</h2>
          <p>Select a tower to filter.</p>
          <p>Tower location: {currentLocation || ALL_TOWERS}</p>
          <p hidden={!currentName}>Tower name: {currentName || ''}</p>

          <div className="tower-actions" hidden={!showChildren}>
            <button className="underline-btn" onClick={resetSelection}>
              <FontAwesomeIcon icon={faArrowLeft} />
              Tower selection
            </button>
          </div>

          <hr />
        </div>

        <div className="flex-4">
          <div className="tower-images">
            {/* TOWER LOCATIONS */}
            <div className="tower-root tower-container" hidden={showChildren}>
              <img className="stronghold" src={stronghold} alt={STRONGHOLD} onClick={() => changeTower(STRONGHOLD)} />
              <img className="bronze-tower" src={bronzeTower} alt={BRONZE} onClick={() => changeTower(BRONZE)} />
              <img className="dalberg-tower" src={dalbergTower} alt={DALBERG} onClick={() => changeTower(DALBERG)} />
              <img className="silver-tower" src={silverTower} alt={SILVER} onClick={() => changeTower(SILVER)} />
            </div>

            {/* INDIVIDUAL TOWERS */}
            <div className="tower-children tower-container" hidden={!showChildren}>
              <img className="root-tower" src={getRootTower()} alt="" />
              <img className="tower-1" src={defaultTower} alt="" />
              <img className="tower-2" src={defaultTower} alt="" />
              <img className="tower-3" src={defaultTower} alt="" />
              <img className="tower-4" src={defaultTower} alt="" />
              <img className="tower-5" src={defaultTower} alt="" />
              <img className="tower-6" src={defaultTower} alt="" />
              <img className="tower-7" src={defaultTower} alt="" />
              <img className="tower-8" src={defaultTower} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TowerMap;
