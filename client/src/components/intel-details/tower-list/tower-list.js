import React, { useState, useEffect } from 'react';
import { socket } from 'globals/socket.js';
import AddTowerDialog from '../add-tower-dialog/add-tower-dialog.js';
import TowerData from '../tower-data/tower-data.js';
import addButton from 'assets/icons/add.png';
import TowerMap from '../tower-map/tower-map.js';
import './tower-list.css';

const TowerList = (props) => {
  const [towerList, setTowerList] = useState(props.towerList);
  const [filteredTower, setFilteredTower] = useState({});
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
    setFilteredTower({
      location: updatedTowerList[0] ? updatedTowerList[0].location : null,
      name: updatedTowerList[0] ? updatedTowerList[0].towerName : null
    });

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

  // Filter the list based on a tower selection in the tower map
  const filterTowerList = (towerLocation, towerName) => {
    /**
     * Need to emit instead of filtering on client. If you filter by towerList on the UI then
     * any changes the user makes to a character will be lost when they change to a different
     * tower. This is because when a character update happens, we broadcast a socket event (We
     * need to broadcast so the client doesn't lose focus when switching to a different input).
     * Thus, the "towerListUpdate" is never called. This solution seems to work pretty well.
     */
    socket.emit('filterTower', { pageId: props.intelId, towerLocation, towerName });
  }

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

      {/* TOWER MAP */}
      <TowerMap onFilterList={filterTowerList} filteredTower={filteredTower} />

      {/* SHOW ALL TOWER INFO */}
      {
        towerList.length > 0
          ? towerList.map((tower) =>
            <TowerData
              key={tower._id}
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
