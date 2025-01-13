// controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma";
import * as bcrypt from "bcryptjs";

interface UserController {
  getUsers(req: Request, res: Response): void;
  createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const userController: UserController = {
  getUsers: (req: Request, res: Response): void => {
    const users = prisma.user.findMany();
    res.status(200).json({ users });
    return;
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

    bcrypt.hash(password, 10, async (error, hashedPassword: string) => {
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
            message: `The user was successfully registered`,
            newUser: newUser,
          });
        } catch (errors) {
          return next(errors);
        }
      }
    });

    return;
  },
};

export default userController;
