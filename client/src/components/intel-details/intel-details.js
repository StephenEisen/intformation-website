import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { socket } from 'globals/socket.js';
import { Routes } from 'globals/routes';
import TowerList from './tower-list/tower-list';
import './intel-details.css'
import { intelGet } from 'globals/api';

const IntelDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [intel, setIntel] = useState(null);

  const localStoragePushIntel = () => {
    const recents = JSON.parse(localStorage.getItem('recentIntels')) || [];
    const filtered = recents.filter(el => el !== id);
    filtered.unshift(id);
    const updated = filtered.slice(0, 10);
    localStorage.setItem('recentIntels', JSON.stringify(updated));
  }

  const loadIntel = async () => {
    try {
      const intel = await intelGet(id);
      setIntel(intel);
      localStoragePushIntel();
  
      //fetch the room to join based on the pageid can also pass in a username
      const room = id;
      const username = 'admin';
      socket.emit('joinRoom', { username, room });

    } catch (err) {

      history.push(Routes.Intel);
    }
  };

  useEffect(() => {
    loadIntel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      { intel ? <TowerList intelId={id} towerList={intel.data} /> : null }
    </div>
  )
}

export default IntelDetails;
