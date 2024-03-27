import { BaseRouter } from "../base/base.router";
import { PlayerController } from "../controller/player.controller";

export class PlayerRouter extends BaseRouter {

  static prefix = '/api'
  constructor(private readonly playerController: PlayerController) {
    super(PlayerRouter.prefix);
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get("/games/:id", this.playerController.getGames.bind(this.playerController));
  }


}