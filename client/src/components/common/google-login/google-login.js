import React, { useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import jwt from 'jsonwebtoken';
import { sessionPost } from 'globals/api';
import './google-login.css'

const clientId = '724205843180-cct4ta2hobvdop43rrfn9ac28pr0pldp.apps.googleusercontent.com';

const GoogleLogin = () => {
  const [user, setUser] = useState({});

  const signInSuccess = resp => {
    sessionPost(resp.tokenObj)
      .then(token => {
        localStorage.setItem('authToken', token);
        const decoded = jwt.decode(token);
        setUser(decoded);
      })
      .catch(err => console.error(err));
  };

  const signInFailure = resp => {
    console.error('Login Failed:', resp);
  };

  const signOutSuccess = () => {
    setUser({});
  }

  const signOutFailure = resp => {
    console.error('Logout Failed:', resp)
  }

  const { signIn } = useGoogleLogin({
    clientId: clientId,
    onSuccess: signInSuccess,
    onFailure: signInFailure,
    isSignedIn: true
  });

  const { signOut } = useGoogleLogout({
    clientId: clientId,
    onLogoutSuccess: signOutSuccess,
    onFailure: signOutFailure,
    isSignedIn: true
  });

  return (
    <div className="google-login">
      {
        user.email
          ? <div>
              <img src={user.profileImg} alt='' />
              <p>{user.name} ({user.email})</p>
              <button onClick={signOut} className="center-underline-btn login-button">
                <span><FontAwesomeIcon icon={faGoogle} /></span>Sign Out
              </button>
            </div>
          : <button onClick={signIn} className="center-underline-btn login-button">
              <span><FontAwesomeIcon icon={faGoogle} /></span>Sign in with Google
            </button>
      }
    </div>
  );
};

export default GoogleLogin;
