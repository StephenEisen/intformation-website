import socketIOClient from "socket.io-client";
export const webserver = "https://epic7.gg";
export const socket = socketIOClient(webserver);
