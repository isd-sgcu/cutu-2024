

import { Router } from 'express'

export abstract class BaseRouter {
  router: Router
  prefix: string
  abstract initRoutes(): void

  constructor(prefix: string) {
    this.router = Router()
    this.prefix = prefix
  }

  getPrefix() {
    return this.prefix
  }
}
