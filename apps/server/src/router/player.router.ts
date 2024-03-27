import { Router } from "express";
import { BaseRouter } from "../base/base.router";
import { PlayerController } from "../controller/player.controller";

export class PlayerRouter implements BaseRouter {
  router: Router;
  prefix: string = "/player";
  playerController: PlayerController;

  constructor(playerController: PlayerController) {
    this.router = Router();
    this.playerController = playerController;
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get("/games", this.playerController.getGames.bind(this.playerController));
  }
}