import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { socket } from 'globals/socket.js';
import { Routes } from 'globals/constants.js';
import { intelAuthTokenPost, intelGet, intelPasswordPost } from 'globals/api';
import TowerList from './tower-list/tower-list';
import './intel-details.css';

const IntelDetails = () => {
  const { pageId, towerLocation, towerIndex } = useParams();
  const history = useHistory();
  const [intel, setIntel] = useState(null);
  const [password, setPassword] = useState('');
  const [forbidden, setForbidden] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handlePasswordSubmit = (event) => {
    if (forbidden) {
      intelAuthTokenPost(pageId, password)
        .then(token => {
          loadIntel();
          setForbidden(false);
        })
        .catch(err => console.error(err));

      setPassword('');
    } else {
      intelPasswordPost(pageId, password).catch((err) => console.error('Error', err));
      setPassword('');
    }
    event.preventDefault();
  };

  const localStoragePushIntel = () => {
    const recents = JSON.parse(localStorage.getItem('recentIntels')) || [];
    const filtered = recents.filter(el => el !== pageId);
    filtered.unshift(pageId);
    const updated = filtered.slice(0, 10);
    localStorage.setItem('recentIntels', JSON.stringify(updated));
  }

  const loadIntel = async () => {
    try {
      const response = await intelGet(pageId);

      if (response.ok) {
        const intel = await response.json();
        setIntel(intel);
        localStoragePushIntel();
        socket.emit('joinRoom', pageId);
      } else if (response.status === 403) {
        setForbidden(true);
      } else {
        history.push(Routes.Intel);
      }
    } catch (err) {
      history.push(Routes.Intel);
    }
  };

  useEffect(() => {
    loadIntel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  // I'm just being lazy and reusing this form for both password set and
  // password entry. I'm sure Mo can design a nicer UX here
  let passwordForm = null;

  if (intel || forbidden) {
    passwordForm = (
      <form onSubmit={handlePasswordSubmit} className="form-password">
        <input
          type="text"
          name="password"
          placeholder={forbidden ? "Enter password" : "Set password"}
          value={password}
          onChange={handlePasswordChange}>
        </input>
        <button type="submit" className="btn-password slide-btn-horizontal">
          <span>
            <FontAwesomeIcon icon={faCheck} className="icon-check-password" />
          </span>
        </button>
      </form>
    );
  }

  return (
    <div>
      {passwordForm}
      {forbidden ? <p>Forbidden</p> : null}

      {
        intel
          ? <TowerList
              pageId={pageId}
              towerList={intel.towerList}
              towerLocation={towerLocation}
              towerIndex={towerIndex}
            />
          : null
      }
    </div>
  )
}

export default IntelDetails;
