import { BaseRouter } from '$/base/base.router'
import { AdminController } from '$/controller/admin.controller'
import { basicAuth } from '$/middleware/admin.middleware'

export class AdminRouter extends BaseRouter {
  static prefix = '/admin-api'
  constructor(private readonly adminController: AdminController) {
    super(AdminRouter.prefix)
    this.initRoutes()
  }

  initRoutes(): void {
    this.router.get(
      '/games',
      basicAuth,
      this.adminController.listGames.bind(this.adminController),
    )
    this.router.post(
      '/games',
      basicAuth,
      this.adminController.createGame.bind(this.adminController),
    )
    this.router.get(
      '/games/state',
      basicAuth,
      this.adminController.getGameState.bind(this.adminController),
    )
    this.router.get(
      '/games/:id',
      basicAuth,
      this.adminController.getGameByID.bind(this.adminController),
    )
    this.router.post(
      '/games/:id/start',
      basicAuth,
      this.adminController.startGame.bind(this.adminController),
    )
    this.router.post(
      '/games/:id/end',
      basicAuth,
      this.adminController.endGame.bind(this.adminController),
    )
    this.router.put(
      '/screen/state/:state',
      basicAuth,
      this.adminController.setScreenState.bind(this.adminController),
    )
    this.router.get(
      '/games/:id/summary',
      basicAuth,
      this.adminController.getGameSummary.bind(this.adminController),
    )
  }
}
