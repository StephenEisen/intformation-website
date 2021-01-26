import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { socket } from 'globals/socket.js';
import { Routes } from 'globals/routes';
import TowerList from './tower-list/tower-list';
import './intel-details.css'

const IntelDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [towerList, setTowerList] = useState([]);
  const [showTowerList, setShowTowerList] = useState(false);

  const localStoragePushIntel = () => {
    const recents = JSON.parse(localStorage.getItem('recentIntels')) || [];
    const filtered = recents.filter(el => el !== id);
    filtered.unshift(id);
    const updated = filtered.slice(0, 10);
    localStorage.setItem('recentIntels', JSON.stringify(updated));
  }

  // We should consider changing create tower and find intel to api calls
  // It would allow us to avoid these socket.off calls
  const findIntelSuccess = (intel) => {
    setTowerList(intel.data);
    localStoragePushIntel();
    setShowTowerList(true);
  }

  const findIntelError = () => {
    setShowTowerList(false);
    history.push(Routes.Intel);
  }

  useEffect(() => {
    socket.on('findIntelSuccess', findIntelSuccess);
    socket.on('findIntelError', findIntelError);
    socket.emit('findIntel', id);

    return () => {
      socket.off('findIntelSuccess', findIntelSuccess);
      socket.off('findIntelError', findIntelError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      { showTowerList ? <TowerList intelId={id} towerList={towerList} /> : null}
    </div>
  )
}

export default IntelDetails;
