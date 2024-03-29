import ws from 'k6/ws';
import { check } from 'k6';
import { uuidv4, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

const fid = uuidv4();
const name = uuidv4();
var count = 0;

export const options = {
    "stages": [
    {
      "duration": "2m",
      "target": 500
    },
    {
      "duration": "2m",
      "target": 1500
    },
    {
      "duration": "1m",
      "target": 0
    }
  ],
};

export default function() {
  const url = 'wss://api.cutu2024.sgcu.in.th/api/ws/?EIO=4&transport=websocket';

  const team = ["CU", "TU"][randomIntBetween(0, 1)];
  
  const handshakeSocket = ws.connect(url, {}, socket => {
    socket.on('open', () => handleOpen(socket, team));
    socket.on('message', (message) => handleMessage(socket, message));
    socket.on('close', () => console.log('close'));
  });

  check(handshakeSocket, { 'status is 101': (r) => r && r.status === 101});
}

function handleMessage(socket, message) {
  const packetType = message[0];

  switch (packetType) {
  case '2':
    socket.send('3');
    break;
  case '4':
    console.log(packetContent);
    break;
  }
}

function handleOpen(socket, team) {
  console.log('open');
  const header = {
    fid,
    name,
  };

  // auth
  const msg = `40${JSON.stringify(header)}`;
  console.log(`Sending ${msg}`);
  socket.send(msg);

  // main loop
  socket.setInterval(() => {
    const msg = `42["submit","${team} ${count}"]`;
    console.log(`Sending ${msg}`);
    socket.send(msg);
    count += randomIntBetween(0, 10);
  }, 500)
}

