
import { Client } from '$/models/client.model';
import { Socket } from 'socket.io';
declare module 'socket.io' {
  interface Socket {
    user: Client;
  }
}