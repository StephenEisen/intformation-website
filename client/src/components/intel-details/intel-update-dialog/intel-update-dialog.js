import { socket } from 'globals/socket';
import React from 'react';

const outputUsers = (users) => {
  return users.map(user => `<li>${user.username}</li>`).join('');
}

const getCurrentUsers = () => {
  socket.on('getRoomUsers', ({ room, users}) => {
    outputUsers(users);
  })
};

const IntelUpdateDialog = () => {

  return(
    <div>
      {getCurrentUsers()}
    </div>
  )
};

export default IntelUpdateDialog;
