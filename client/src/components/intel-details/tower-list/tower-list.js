import React, { useState, useEffect } from 'react';
import { socket } from 'globals/socket.js';
import AddTowerDialog from '../add-tower-dialog/add-tower-dialog.js';
import TowerData from '../tower-data/tower-data.js';
import addButton from 'assets/icons/add.png';
import './tower-list.css';

const TowerList = (props) => {
  const [towerList, setTowerList] = useState(props.towerList);
  const [addTowerDialogVisible, setAddTowerDialogVisible] = useState(false);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);

  // Update tower list when a new tower is added
  const updateTowerList = (intel) => {
    setAddTowerDialogVisible(false);
    setTowerList(intel.data);
  }

  // Show or hide the add tower dialog
  const toggleAddTowerDialog = (isVisible) => {
    setAddTowerDialogVisible(isVisible);
  }

  const updateScrollAtBottom = () => {
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50;
    setIsScrollAtBottom(isAtBottom);
  }

  // Logic to run when this component is rendered for the first time
  useEffect(() => {
    updateScrollAtBottom();
    window.addEventListener('scroll', updateScrollAtBottom);

    socket.on('createTowerSuccess', updateTowerList);
    socket.on('updateCharacterSuccess', updateTowerList);

    return () => {
      socket.off('createTowerSuccess', updateTowerList);
      socket.off('updateCharacterSuccess', updateTowerList);
      window.removeEventListener('scroll', updateScrollAtBottom);
    }
  }, []);

  // Render all the tower data
  return (
    <section className="tower-list">
      {/* ADD NEW TOWER */}
      <AddTowerDialog
        visible={addTowerDialogVisible}
        intelId={props.intelId}
        onClose={() => toggleAddTowerDialog(false)}
      />

      <img
        src={addButton}
        className={`add-tower-btn ${isScrollAtBottom ? 'fixed-bottom-btn' : ''}`}
        title="Add Tower"
        alt="Add Tower"
        onClick={() => toggleAddTowerDialog(true)}
      />

      {/* SHOW ALL TOWER INFO */}
      {
        towerList.length > 0
          ? towerList.map((tower, index) =>
            <TowerData
              key={index}
              towerIndex={index}
              intelId={props.intelId}
              towerData={tower}
              towerImages={props.towerImages}
            />
          )
          : null
      }
    </section>
  )
}

export default TowerList;
