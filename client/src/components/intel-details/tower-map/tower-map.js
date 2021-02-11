import React, { useEffect, useState } from 'react';
import stronghold from 'assets/towers/stronghold.png';
import bronzeTower from 'assets/towers/bronze.png';
import silverTower from 'assets/towers/silver.png';
import dalbergTower from 'assets/towers/dalberg.png';
import './tower-map.css';

const TowerMap = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentName, setCurrentName] = useState(null);

  const changeTower = (towerLocation, towerName) => {
    setCurrentLocation(towerLocation);
    setCurrentName(towerName);
    props.onFilterList(towerLocation, towerName);
  }

  useEffect(() => {
    if (props.filteredTower.location) {
      setCurrentLocation(props.filteredTower.location);
      setCurrentName(props.filteredTower.name);
    }
  }, [props]);

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
