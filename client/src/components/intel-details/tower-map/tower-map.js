import React, { useState } from 'react';
import { socket } from 'globals/socket.js';
import stronghold from 'assets/towers/stronghold.png';
import bronzeTower from 'assets/towers/bronze.png';
import silverTower from 'assets/towers/silver.png';
import dalbergTower from 'assets/towers/dalberg.png';
import './tower-map.css';

const TowerMap = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentName, setCurrentName] = useState(null);

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
  }

  return (
    <section className="tower-map container">
      <div className="flex-container">
        <div className="tower-info flex-3">
          <h2>Tower Map</h2>
          <p>Select a tower location to filter towers.</p>
          <p>Tower location: {currentLocation || 'All'}</p>
          <p hidden={!currentName}>Tower name: {currentName || ''}</p>
        </div>

        <div className="flex-4">
          <div className="tower-images">
            {/* TOWER LOCATIONS */}
            <div className="stronghold">
              <img src={stronghold} alt="Stronghold" onClick={() => changeTower('Stronghold')} />
            </div>
            <div className="bronze-tower">
              <img src={bronzeTower} alt="Bronze Fortress" onClick={() => changeTower('Bronze Fortress')} />
            </div>
            <div className="dalberg-tower">
              <img src={dalbergTower} alt="Dalberg Fortress" onClick={() => changeTower('Dalberg Fortress')} />
            </div>
            <div className="silver-tower">
              <img src={silverTower} alt="Silver Fortress" onClick={() => changeTower('Silver Fortress')} />
            </div>

            {/* INDIVIDUAL TOWERS */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default TowerMap;
