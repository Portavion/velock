import { NextFunction, Request, Response } from "express";

interface UsersHandler {
  getPing(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const pingHandler: UsersHandler = {
  getPing: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.status(200).json({ msg: "pong" });
      return;
    } catch (error) {
      next(error);
    }
  },
};

export default pingHandler;
