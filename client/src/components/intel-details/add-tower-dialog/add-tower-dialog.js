import React, { useState, useEffect } from 'react';
import { socket } from 'globals/socket';
import castle from 'assets/icons/castle2.png';
import './add-tower-dialog.css';

const AddTowerDialog = (props) => {
  const [towerName, setTowerName] = useState('');
  const [errorStates, setErrorStates] = useState({});

  useEffect(() => {
    socket.on('addTowerError', setAddTowerError);

    return () => {
      socket.off('addTowerError', setAddTowerError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeDialog = () => {
    resetDialog();
    props.onClose();
  }

  const resetDialog = () => {
    setTowerName('');
    setErrorStates({});
  }

  const setAddTowerError = () => {
    setErrorStates({ towerName: !towerName || towerName === '' });
  }

  const sendTowerData = () => {
    if (towerName && towerName !== '') {
      socket.emit('addTower', {
        pageId: props.pageId,
        towerIndex: props.towerIndex,
        towerLocation: props.towerLocation,
        towerName: towerName
      });
      closeDialog();
    } else {
      setAddTowerError();
    }
  };

  const updateTowerName = (value) => {
    if (value && value !== '') {
      setErrorStates({ towerName: false });
      setTowerName(value);
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

          {/* NAME */}
          <div className="add-tower-name">
            <h2>Tower name (optional)</h2>
            <input
              type="text"
              className={errorStates.towerName ? 'error' : ''}
              placeholder="Tower name"
              value={towerName}
              onChange={(e) => updateTowerName(e.target.value)}>
            </input>
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
