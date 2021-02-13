import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
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

  const changeLocation = (towerLocation, towerName) => {
    setCurrentLocation(towerLocation);
    setCurrentName(towerName);
    setShowChildren(towerLocation !== STRONGHOLD && towerLocation !== ALL_TOWERS);

    props.onTowerChange(towerLocation, towerName);
  }

  const changeTower = (index) => {
    const towerList = props.towerList.filter((tower) => tower.location === currentLocation);

    if (towerList.length > 0 && towerList[index]) {
      changeLocation(currentLocation, towerList[index].name);
    }
  }

  const showAllTowers = () => {
    changeLocation(currentLocation);
  }

  const getRootTower = () => {
    if (showChildren) {
      return towerLocations[currentLocation].img;
    }
  }

  const resetSelection = () => {
    changeLocation(ALL_TOWERS);
  }

  return (
    <section className="tower-map container">
      <div className="flex-container">
        <div className="tower-info flex-2">
          <h2>Tower Map</h2>
          <p>Select a tower to filter.</p>

          <div className="tower-info-content">
            <span className="tower-info-title">Tower location:</span>
            <span className="tower-info-value">{currentLocation || ALL_TOWERS}</span>
          </div>

          <div className="tower-info-content">
            <span className="tower-info-title">Tower name:</span>
            <span className="tower-info-value">{currentName || 'Not selected'}</span>
          </div>

          <div className="tower-actions" hidden={!showChildren}>
            <button className="right-underline-btn" onClick={resetSelection}>
              <FontAwesomeIcon icon={faArrowLeft} />
              Tower selection
            </button>
            <button className="center-underline-btn" onClick={showAllTowers}>
              <FontAwesomeIcon icon={faEye} />
              Show all towers
            </button>
          </div>

          <hr />
        </div>

        <div className="flex-4">
          <div className="tower-images">
            {/* TOWER LOCATIONS */}
            <div className="tower-root tower-container" hidden={showChildren}>
              <img className="stronghold" src={stronghold} alt={STRONGHOLD} onClick={() => changeLocation(STRONGHOLD)} />
              <img className="bronze-tower" src={bronzeTower} alt={BRONZE} onClick={() => changeLocation(BRONZE)} />
              <img className="dalberg-tower" src={dalbergTower} alt={DALBERG} onClick={() => changeLocation(DALBERG)} />
              <img className="silver-tower" src={silverTower} alt={SILVER} onClick={() => changeLocation(SILVER)} />
            </div>

            {/* INDIVIDUAL TOWERS */}
            <div className="tower-children tower-container" hidden={!showChildren}>
              <img className="root-tower" src={getRootTower()} alt="" onClick={() => changeTower(0)} />
              <img className="tower-1" src={defaultTower} alt="" onClick={() => changeTower(1)} />
              <img className="tower-2" src={defaultTower} alt="" onClick={() => changeTower(2)} />
              <img className="tower-3" src={defaultTower} alt="" onClick={() => changeTower(3)} />
              <img className="tower-4" src={defaultTower} alt="" onClick={() => changeTower(4)} />
              <img className="tower-5" src={defaultTower} alt="" onClick={() => changeTower(5)} />
              <img className="tower-6" src={defaultTower} alt="" onClick={() => changeTower(6)} />
              <img className="tower-7" src={defaultTower} alt="" onClick={() => changeTower(7)} />
              <img className="tower-8" src={defaultTower} alt="" onClick={() => changeTower(8)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TowerMap;
