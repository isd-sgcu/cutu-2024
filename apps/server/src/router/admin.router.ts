

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
      this.adminController.getGames.bind(this.adminController),
    )
    this.router.post(
      '/games',
      basicAuth,
      this.adminController.createGame.bind(this.adminController),
    )
    this.router.get(
      '/games/:id',
      basicAuth,
      this.adminController.getGame.bind(this.adminController),
    )
  }
}
