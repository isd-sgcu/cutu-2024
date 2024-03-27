import { Router } from "express";

export interface BaseRouter {
  router: Router;
  prefix: string;
  initRoutes(): void;
}