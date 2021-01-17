import socketIOClient from "socket.io-client";

export const socket = socketIOClient("http://localhost:8080");

export function getPageId() {
  if (window.history && typeof window.history.state === 'string') {
    return window.history.state;
  }
  return null;
}
