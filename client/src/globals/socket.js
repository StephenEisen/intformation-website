import socketIOClient from "socket.io-client";

export const socket = socketIOClient("https://epic7.gg/api");

export function getPageId() {
  const windowHistory = window.history.state;
  const windowLocation = window.location.pathname;

  if (windowHistory && typeof windowHistory.state === 'string') {
    return window.history.state;
  }
  else if (windowLocation && typeof windowLocation === 'string'){
    return windowLocation.split("/")[2];
  }
  return null;
}
