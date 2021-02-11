import React, { useState, useEffect } from 'react';
import { socket } from 'globals/socket.js';
import AddTowerDialog from '../add-tower-dialog/add-tower-dialog.js';
import TowerData from '../tower-data/tower-data.js';
import addButton from 'assets/icons/add.png';
import TowerMap from '../tower-map/tower-map.js';
import './tower-list.css';

const TowerList = (props) => {
  const [towerList, setTowerList] = useState(props.towerList);
  const [addTowerDialogVisible, setAddTowerDialogVisible] = useState(false);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);

  // Logic to run when this component is rendered for the first time
  useEffect(() => {
    updateScrollAtBottom();
    window.addEventListener('scroll', updateScrollAtBottom);

    socket.on('addTowerSuccess', addTowerUpdate);
    socket.on('updateCharacterSuccess', towerListUpdate);
    socket.on('filterTowerSuccess', towerListUpdate);

    return () => {
      socket.off('addTowerSuccess', addTowerUpdate);
      socket.off('updateCharacterSuccess', towerListUpdate);
      socket.off('filterTowerSuccess', towerListUpdate);
      window.removeEventListener('scroll', updateScrollAtBottom);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update tower list when a new tower is added
  const addTowerUpdate = (updatedTowerList) => {
    setAddTowerDialogVisible(false);
    towerListUpdate(updatedTowerList);
  }

  // Update tower list
  const towerListUpdate = (updatedTowerList) => {
    setTowerList(updatedTowerList);
  }

  // Show or hide the add tower dialog
  const toggleAddTowerDialog = (isVisible) => {
    setAddTowerDialogVisible(isVisible);
  }

  // Update whether the user has scrolled to the bottom.
  const updateScrollAtBottom = () => {
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50;
    setIsScrollAtBottom(isAtBottom);
  }

  // Render all the tower data
  return (
    <section className="tower-list">
      {/* ADD NEW TOWER */}
      <AddTowerDialog
        visible={addTowerDialogVisible}
        pageId={props.pageId}
        onClose={() => toggleAddTowerDialog(false)}
      />

      <img
        src={addButton}
        className={`add-tower-btn ${isScrollAtBottom ? 'fixed-bottom-btn' : ''}`}
        title="Add Tower"
        alt="Add Tower"
        onClick={() => toggleAddTowerDialog(true)}
      />

      {/* TOWER MAP */}
      <TowerMap pageId={props.pageId} />

      {/* SHOW ALL TOWER INFO */}
      {
        towerList.length > 0
          ? towerList.map((tower) =>
            <TowerData
              key={tower._id}
              pageId={props.pageId}
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
