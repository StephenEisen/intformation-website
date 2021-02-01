import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { socket } from 'globals/socket';
import castle from 'assets/icons/castle2.png';
import './add-tower-dialog.css';
const towerLocations = require('data/tower-locations.json');

const AddTowerDialog = (props) => {
  const [towerName, setTowerName] = useState('');
  const [towerLocation, setTowerLocation] = useState('');
  const [errorStates, setErrorStates] = useState({});

  useEffect(() => {
    socket.on('createTowerError', setAddTowerError);

    return () => {
      socket.off('createTowerError', setAddTowerError);
    }
  }, []);

  const setAddTowerError = () => {
    setErrorStates({ towerLocation: true });
  }

  const sendTowerData = () => {
    if (towerLocation && towerLocation !== '') {
      socket.emit('createTower', {
        pageId: props.intelId,
        name: towerName,
        location: towerLocation,
      });
    } else {
      setAddTowerError();
    }
  };

  const updateTowerLocation = (value) => {
    if (value && value !== '') {
      setErrorStates({ towerLocation: false });
      setTowerLocation(value);
    }
  }

  if (!props.visible) {
    return null;
  }

  return (
    <div className="add-tower-dialog">
      <div className="add-tower-modal">
        <div className="add-tower-content">
          {/* HEADER */}
          <div className="add-tower-header">
            <h1>
              <img src={castle} alt="Add Tower" />
              Add Tower
            </h1>
          </div>

          {/* LOCATION */}
          <div className="add-tower-location">
            <h2>Tower location</h2>
            <Select
              className={`select-dropdown ${errorStates.towerLocation ? 'error' : ''}`}
              options={towerLocations}
              placeholder="Choose Tower Location"
              onChange={(e) => updateTowerLocation(e.value)}
            />
          </div>

          {/* NAME */}
          <div className="add-tower-name">
            <h2>Tower name (optional)</h2>
            <input
              type="text"
              placeholder="Tower name"
              value={towerName}
              onChange={(e) => setTowerName(e.target.value)}>
            </input>
          </div>

          {/* ACTIONS */}
          <div className="add-tower-actions">
            <button className="slide-btn-horizontal" onClick={sendTowerData}>
              <span className="slide-btn-text">Add Tower</span>
            </button>

            <button className="slide-btn-horizontal" onClick={props.onClose}>
              <span className="slide-btn-text">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTowerDialog;
