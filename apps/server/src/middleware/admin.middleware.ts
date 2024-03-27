import { NextFunction, Request, Response } from "express";

export function basicAuth(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization === (process.env.BASIC_AUTH || 'Basic YWRtaW46cGFzc3dvcmQ=')) {
    return next();
  }
  return res.status(401).send();
}