import { io } from 'socket.io-client';

export const webserver = "http://localhost:8080";
export const socket = io(webserver);
