import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AddTowerDialog from "../add-tower-dialog/add-tower-dialog.js";
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
  const [currentTowerIndex, setCurrentTowerIndex] = useState(null);
  const [showChildren, setShowChildren] = useState(false);
  const [addTowerDialogVisible, setAddTowerDialogVisible] = useState(false);

  const toggleAddTowerDialog = (isVisible) => {
    setAddTowerDialogVisible(isVisible);
  }

  const getTowerByIndex = (index) => {
    const locationTowers = props.towerList[currentLocation];

    if (locationTowers && locationTowers[index]) {
      const towerId = locationTowers[index]._id;
      const tower = locationTowers.find((item) => item.location === currentLocation && item._id === towerId);
      return tower;
    }
  }

  const changeLocation = (towerLocation) => {
    setCurrentLocation(towerLocation);

    if (towerLocation === STRONGHOLD) {
      const tower = props.towerList[STRONGHOLD][0];

      if (tower.characters.length > 0) {
        props.onTowerChange(towerLocation, tower._id);
      } else {
        setCurrentTowerIndex(0);
        toggleAddTowerDialog(true);
      }
    } else {
      setShowChildren(towerLocation !== STRONGHOLD && towerLocation !== ALL_TOWERS);
      props.onTowerChange(towerLocation);
    }
  }

  const changeTower = (index) => {
    const tower = getTowerByIndex(index);

    if (tower) {
      props.onTowerChange(currentLocation, tower._id);
    } else {
      setCurrentTowerIndex(index);
      toggleAddTowerDialog(true);
    }
  }

  const resetSelection = () => {
    changeLocation(ALL_TOWERS);
  }

  const getRootTower = () => {
    if (showChildren) {
      return towerLocations[currentLocation].img;
    }
  }

  const getTowerName = (index) => {
    const tower = getTowerByIndex(index);
    let towerName = tower ? tower.name : `Tower ${index + 1}`;

    if (towerName.length > 7) {
      towerName = towerName.slice(0, 7) + '...';
    }

    return towerName;
  }

  const getTowerChildren = () => {
    const towerChildren = [];

    for (let i = 0; i < 9; i++) {
      const tower = getTowerByIndex(i);
      const towerKey = `tower-${i}`;
      const towerImage = i === 4 ? getRootTower() : defaultTower;

      towerChildren.push((
        <div key={towerKey} className={`${towerKey} ${tower && tower.name ? '' : 'no-tower'}`} onClick={() => changeTower(i)}>
          <img src={towerImage} alt="" />
          <div className="tower-map-name">{getTowerName(i)}</div>
        </div>
      ));
    }

    return towerChildren;
  }

  return (
    <section className="tower-map container">
      {/* ADD NEW TOWER */}
      {
        addTowerDialogVisible && currentTowerIndex >= 0
          ? <AddTowerDialog
            pageId={props.pageId}
            towerIndex={currentTowerIndex}
            towerLocation={currentLocation}
            onClose={() => toggleAddTowerDialog(false)}
          />
          : null
      }

      <div className="flex-container">
        <div className="tower-info flex-2">
          <h2>Tower Map</h2>
          <p>Select a tower to filter.</p>

          <div className="tower-info-content">
            <span className="tower-info-title">Tower location:</span>
            <span className="tower-info-value">{currentLocation || ALL_TOWERS}</span>
          </div>

          <div className="tower-actions" hidden={!showChildren}>
            <button className="right-underline-btn" onClick={resetSelection}>
              <FontAwesomeIcon icon={faArrowLeft} />Tower selection
            </button>
          </div>

          <hr />
        </div>

        <div className="flex-4">
          <div className="tower-images">
            {/* TOWER LOCATIONS */}
            <div className="tower-root tower-container" hidden={showChildren}>
              <div className="stronghold">
                <img src={stronghold} alt={STRONGHOLD} onClick={() => changeLocation(STRONGHOLD)} />
                <div className="tower-map-name">{STRONGHOLD}</div>
              </div>
              <div className="bronze-tower">
                <img src={bronzeTower} alt={BRONZE} onClick={() => changeLocation(BRONZE)} />
                <div className="tower-map-name">{BRONZE}</div>
              </div>
              <div className="dalberg-tower">
                <img src={dalbergTower} alt={DALBERG} onClick={() => changeLocation(DALBERG)} />
                <div className="tower-map-name">{DALBERG}</div>
              </div>
              <div className="silver-tower">
                <img src={silverTower} alt={SILVER} onClick={() => changeLocation(SILVER)} />
                <div className="tower-map-name">{SILVER}</div>
              </div>
            </div>

            {/* INDIVIDUAL TOWERS */}
            <div className="tower-children tower-container" hidden={!showChildren}>
              {getTowerChildren()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TowerMap;
