import { Server, Socket } from "socket.io";
import { PlayerService } from "../service/player.service";
import { createLogger } from "../utils/logger";

export class PlayerWebSocketController {
  logger = createLogger("PlayerWebSocketController")
  constructor(private readonly io: Server, private readonly playerService: PlayerService) { }

  async onConnection(socket: Socket) {
    this.logger.info(`New connection: ${socket.id}`);
    socket.on("submit", async (message) => {
      this.logger.info("Received message", message);
      const game = await this.playerService.getGame();
      this.logger.info("Game", game);
      socket.emit("game", game);
    });

    socket.on("disconnect", () => {
      this.logger.info(`Disconnected: ${socket.id}`);
    });

    socket.on("state", (state) => {
      this.logger.info("Received state", state);
      socket.broadcast.emit("state", state);
    })
  }
}