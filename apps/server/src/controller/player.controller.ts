import { Server, Socket } from "socket.io";
import { PlayerService } from "../service/player.service";
import { Request, Response } from 'express';
import { createLogger } from "../utils/logger";

export class PlayerController {
  private readonly logger = createLogger("PlayerController");
  constructor(private readonly io: Server, private readonly playerService: PlayerService) { }

  async onConnection(socket: Socket) {
    this.logger.info(`New connection: ${socket.id}`);
    socket.on("submit", async (message) => {
      this.logger.info("Received message", message);
      socket.broadcast.emit("message", message);
    });

    socket.on("disconnect", () => {
      this.logger.info(`Disconnected: ${socket.id}`);
    });

    socket.on("state", (state) => {
      this.logger.info("Received state", state);
      socket.emit("state", state);
    })

    socket.emit('state', await this.playerService.getState())
  }

  async getGames(req: Request, res: Response) {
    return this.playerService.getGame(req.params.id).then((game) => {
      res.json(game);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
}