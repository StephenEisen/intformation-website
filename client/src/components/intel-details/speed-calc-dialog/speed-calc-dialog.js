import React, { useState } from 'react';
import './speed-calc-dialog.css';

const SpeedCalcDialog = (props) => {
  const [characterSpeed, setCharacterSpeed] = useState(0);
  const [characterCRPushBack, setCharacterCRPushBack] = useState(0);
  const [characterCRPush, setCharacterCRPush] = useState(0);
  const [targetCRPush, setTargetCRPush] = useState(0);
  const [targetCR, setTargetCR] = useState(0);

  const closeDialog = (minSpeed, maxSpeed) => {
    setCharacterSpeed(0);
    setTargetCR(0);
    setCharacterCRPushBack(0);
    setCharacterCRPush(0);
    setTargetCRPush(0);
    props.onClose(minSpeed, maxSpeed);
  }

  const sendSpeedData = () => {






    closeDialog();
  };

  const updateCharacterSpeed = (value) => {
    setCharacterSpeed(value);
  }

  const updateTargetCR = (value) => {
    setTargetCR(value);
  }

  const updateCharacterCRPushBack = (value) => {
    setCharacterCRPushBack(value);
  }

  const updateCharacterCRPush = (value) => {
    setCharacterCRPush(value);
  }

  const updateTargetCRPush = (value) => {
    setTargetCRPush(value);
  }

  return (
    <div className="add-tower-dialog">
      <div className="add-tower-modal">
        <div className="add-tower-content">
          {/* HEADER */}
          <div className="add-tower-header">
            <h1>
              Calculate Speed
            </h1>
          </div>

          {/* NAME */}
          <div className="add-tower-name">
            <h2>Enter your units speed</h2>
            <input
              type="number"
              placeholder="Speed"
              value={characterSpeed}
              onChange={(e) => updateCharacterSpeed(e.target.value)}>
            </input>
          </div>

          <div className="add-tower-name">
            <h2>Enter the targets CR</h2>
            <input
              type="number"
              placeholder="CR"
              value={targetCR}
              onChange={(e) => updateTargetCR(e.target.value)}>
            </input>
          </div>

          <div className="add-tower-name">
            <h2>Did your unit get pushed back?</h2>
            <input
              type="number"
              placeholder="CR Pushed back"
              value={characterCRPushBack}
              onChange={(e) => updateCharacterCRPushBack(e.target.value)}>
            </input>
          </div>

          <div className="add-tower-name">
            <h2>Did your unit get pushed forward?</h2>
            <input
              type="number"
              placeholder="CR Push"
              value={characterCRPush}
              onChange={(e) => updateCharacterCRPush(e.target.value)}>
            </input>
          </div>

          <div className="add-tower-name">
            <h2>Did the target get pushed forward?</h2>
            <input
              type="number"
              placeholder="Target CR Push"
              value={targetCRPush}
              onChange={(e) => updateTargetCRPush(e.target.value)}>
            </input>
          </div>

          {/* INFORMATION */}
          <div className="add-tower-info">
            <p>Choose an optional tower name.</p>
            <p>You'</p>
          </div>

          {/* ACTIONS */}
          <div className="add-tower-actions">
            <button className="slide-btn-horizontal" onClick={sendSpeedData}>
              <span className="slide-btn-text">Calculate</span>
            </button>

            <button className="slide-btn-horizontal" onClick={closeDialog}>
              <span className="slide-btn-text">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeedCalcDialog;
