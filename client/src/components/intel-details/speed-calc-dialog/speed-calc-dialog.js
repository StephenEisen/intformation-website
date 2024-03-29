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
    <div className="speed-calc-dialog">
      <div className="speed-calc-modal">
        <div className="speed-calc-content">
          {/* HEADER */}
          <div className="speed-calc-header">
            <h1>Calculate Speed</h1>
          </div>

          {/* NAME */}
          <span className="speed-calc-unit-cr">
            <input
              type="number"
              placeholder="Enter your units speed"
              onChange={(e) => updateCharacterSpeed(e.target.value)}
            ></input>

            <input
              type="number"
              placeholder="Enter the targets CR"
              onChange={(e) => updateTargetCR(e.target.value)}
            ></input>
          </span>

          <div className="speed-calc-checkbox">
            <label>
              <input
                type="checkbox"
                onChange={(e) => updateTargetTurnTaken(e.target.checked)}
              ></input>
              Did the target take a turn?
            </label>
          </div>
          The following fields are optional.
          <div className="speed-calc-fields">
            <input
              type="number"
              placeholder="How much did your unit get pushed back?"
              onChange={(e) => updateCharacterCRPushBack(e.target.value)}
            ></input>
          </div>

          <div className="speed-calc-fields">
            <input
              type="number"
              placeholder="How much did your unit get pushed forward?"
              onChange={(e) => updateCharacterCRPush(e.target.value)}
            ></input>
          </div>

          <div className="speed-calc-fields">
            <input
              type="number"
              placeholder="How much did target get pushed forward?"
              onChange={(e) => updateTargetCRPush(e.target.value)}
            ></input>
          </div>

          {/* ACTIONS */}
          <div className="speed-calc-actions">
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
