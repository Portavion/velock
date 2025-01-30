//TODO: refactor: extract business logic into services / workers
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hash } from "bcryptjs";

interface UsersHandler {
  getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const usersHandler: UsersHandler = {
  getUsers: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (!username || !email || !password) {
      res.status(401).json({
        message: "Error: User creation requires username password and email",
      });
    }

    hash(password, 10, async (error, hashedPassword: string) => {
      if (error) {
        return next(error);
      } else {
        try {
          const newUser = await prisma.user.create({
            data: {
              username: username,
              email: email,
              password: hashedPassword,
            },
          });
          res.status(200).json({
            message: `success`,
            newUser: newUser,
          });
        } catch (errors) {
          next(errors);
        }
      }
    });
  },
};

export default usersHandler;
