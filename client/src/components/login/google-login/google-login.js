import React, { useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

const clientId = '724205843180-cct4ta2hobvdop43rrfn9ac28pr0pldp.apps.googleusercontent.com';

const GoogleLogin = () => {
  const [ googleUser, setGoogleUser ] = useState({});

  const signInSuccess = resp => {
    console.log('Login Success:', resp.profileObj);
    setGoogleUser(resp.profileObj);
  };

  const signInFailure = resp => {
    console.log('Login Failed:', resp);
  };

  const signOutSuccess = () => {
    console.log('Logout Success:');
    setGoogleUser({});
  }

  const signOutFailure = resp => {
    console.log('Logout Failed:', resp)
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
    <div>
      {
        googleUser.email ?
        <div>
          <img src={googleUser.imageUrl} />
          <p>{googleUser.email}</p>
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