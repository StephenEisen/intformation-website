import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from 'globals/socket';
import { sanitizeInput } from 'globals/validation';
import { updateUrl } from 'globals/utils';
import castle from 'assets/icons/castle2.png';
import './add-tower-dialog.css';

const AddTowerDialog = (props) => {
  const history = useHistory();
  const [towerName, setTowerName] = useState('');
  const towerNameInputRef = useRef(null);

  useEffect(() => {
    towerNameInputRef.current.focus();
  }, []);

  const closeDialog = () => {
    setTowerName('');
    props.onClose();
  }

  const sendTowerData = () => {
    const sanitizedTowerName = sanitizeInput(towerName);

    socket.emit('addTower', {
      pageId: props.pageId,
      towerIndex: props.towerIndex,
      towerLocation: props.towerLocation,
      towerName: sanitizedTowerName
    });

    updateUrl(history, props.pageId, props.towerLocation, props.towerIndex);
    closeDialog();
  };

  const keyPressHandler = (event) => {
    if (event.key === 'Enter') {
      sendTowerData();
    }
  }

  const updateTowerName = (value) => {
    setTowerName(value);
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

          {/* NAME */}
          <div className="add-tower-name">
            <h2>Tower name (optional)</h2>
            <input
              ref={towerNameInputRef}
              type="text"
              placeholder="Tower name"
              value={towerName}
              onKeyPress={e => keyPressHandler(e)}
              onChange={(e) => updateTowerName(e.target.value)}>
            </input>
          </div>

          {/* INFORMATION */}
          <div className="add-tower-info">
            <p>Choose an optional tower name. A default name will be assigned if one is not given.</p>
            <p>You'll be able to edit the name on the tower details card itself afterwards.</p>
          </div>

          {/* ACTIONS */}
          <div className="add-tower-actions">
            <button className="slide-btn-horizontal" onClick={sendTowerData}>
              <span className="slide-btn-text">Add Tower</span>
            </button>

            <button className="slide-btn-horizontal" onClick={closeDialog}>
              <span className="slide-btn-text">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTowerDialog;
