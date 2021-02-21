import { sessionPost } from 'globals/api';
import React, { useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import jwt from 'jsonwebtoken';

const clientId = '724205843180-cct4ta2hobvdop43rrfn9ac28pr0pldp.apps.googleusercontent.com';

const GoogleLogin = () => {
  const [ user, setUser ] = useState({});

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

  const createSession = () => {

  };

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
    <div>
      {
        user.email ?
        <div>
          <img src={user.imageUrl} />
          <p>{user.name}</p>
          <button onClick={signOut} className="button">Sign Out</button>
        </div> :
        <button onClick={signIn} className="button">
          Sign in with Google
        </button>
      }
    </div>
  );
};

export default GoogleLogin;