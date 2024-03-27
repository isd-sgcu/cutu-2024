import { createClient } from "redis";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { PlayerService } from "./service/player.service";
import { PlayerWebSocketController } from "./controller/websocket.controller";

const server = require("http").createServer();

const pubClient = createClient({ url: "redis://redis:6379" });
const subClient = pubClient.duplicate();

pubClient.connect();
subClient.connect();

const io = new Server(server, {
  adapter: createAdapter(pubClient, subClient),
  path: '/api'
});

const webSocketController = new PlayerWebSocketController(io, new PlayerService());


io.on("connection", (socket) => webSocketController.onConnection(socket))

server.listen(3000, () => {
  console.log("Server running on port 3000");
});