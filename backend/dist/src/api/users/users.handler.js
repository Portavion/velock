import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
const usersHandler = {
  getUsers: async (_req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({ users });
      return;
    } catch (error) {
      next(error);
    }
  },
  createUser: async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (!username || !email || !password) {
      res.status(401).json({
        message: "Error: User creation requires username password and email",
      });
      return;
    }
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
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
          return;
        } catch (errors) {
          next(errors);
        }
      }
    });
  },
};
export default usersHandler;
