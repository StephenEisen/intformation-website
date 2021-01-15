import socketIOClient from "socket.io-client";

export const socket = socketIOClient("http://localhost:8080");

export function getPageId() {
  return window.location.pathname.split("/")[2];
}
