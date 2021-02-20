import React, { useState } from "react";
import "./speed-calc-dialog.css";

const SpeedCalcDialog = (props) => {
  const [characterSpeed, setCharacterSpeed] = useState(0);
  const [characterCRPushBack, setCharacterCRPushBack] = useState(0);
  const [characterCRPush, setCharacterCRPush] = useState(0);
  const [targetCRPush, setTargetCRPush] = useState(0);
  const [targetCR, setTargetCR] = useState(0);
  const [targetTurnTaken, setTargetTurnTaken] = useState(false);

  const closeDialog = (minSpeed, maxSpeed) => {
    setCharacterSpeed(0);
    setTargetCR(0);
    setCharacterCRPushBack(0);
    setCharacterCRPush(0);
    setTargetCRPush(0);
    props.onClose(minSpeed, maxSpeed);
  };

  const sendSpeedData = () => {
    let cr = targetTurnTaken ? targetCR + 100 : targetCR;

    cr = characterCRPush > 0
      ? cr + characterCRPush
      : cr;
    cr = targetCRPush > 0
      ? cr - targetCRPush
      : cr;
    cr = characterCRPushBack > 0
      ? (cr * 100) /  (characterCRPushBack + 100)
      : cr;

    const minSpeed = Math.round(((cr - 5) * characterSpeed) / 100);

    const maxSpeed = Math.round((cr * characterSpeed) / 95);

    closeDialog(minSpeed, maxSpeed);
  };

  const updateCharacterSpeed = (value) => {
    setCharacterSpeed(Number(value));
  };

  const updateTargetCR = (value) => {
    setTargetCR(Number(value));
  };

  const updateCharacterCRPushBack = (value) => {
    setCharacterCRPushBack(Number(value));
  };

  const updateCharacterCRPush = (value) => {
    setCharacterCRPush(Number(value));
  };

  const updateTargetCRPush = (value) => {
    setTargetCRPush(Number(value));
  };

  const updateTargetTurnTaken = (value) => {
    setTargetTurnTaken(value);
  }

  return (
    <div className="add-tower-dialog">
      <div className="add-tower-modal">
        <div className="add-tower-content">
          {/* HEADER */}
          <div className="add-tower-header">
            <h1>Calculate Speed</h1>
          </div>

          {/* NAME */}
          <div className="add-tower-name">
            <span>Enter your units speed</span>
            <input
              type="number"
              placeholder="Speed"
              value={characterSpeed}
              onChange={(e) => updateCharacterSpeed(e.target.value)}
            ></input>
          </div>

          <div className="add-tower-name">
            <span>Enter the targets CR</span>
            <input
              type="number"
              placeholder="CR"
              value={targetCR}
              onChange={(e) => updateTargetCR(e.target.value)}
            ></input>
          </div>

          <div className="add-tower-name">
            <span>Did the target take a turn?</span>
            <label>
              <input
                type="checkbox"
                value={targetTurnTaken}
                onChange={(e) => updateTargetTurnTaken(e.target.checked)}
              ></input>
            </label>
          </div>

          <div className="add-tower-name">
            <span>Did your unit get pushed back?</span>
            <input
              type="number"
              placeholder="CR Pushed back"
              value={characterCRPushBack}
              onChange={(e) => updateCharacterCRPushBack(e.target.value)}
            ></input>
          </div>

          <div className="add-tower-name">
            <span>Did your unit get pushed forward?</span>
            <input
              type="number"
              placeholder="CR Push"
              value={characterCRPush}
              onChange={(e) => updateCharacterCRPush(e.target.value)}
            ></input>
          </div>

          <div className="add-tower-name">
            <span>Did the target get pushed forward?</span>
            <input
              type="number"
              placeholder="Target CR Push"
              value={targetCRPush}
              onChange={(e) => updateTargetCRPush(e.target.value)}
            ></input>
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
};

export default SpeedCalcDialog;
