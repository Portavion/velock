import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";

// import { SECRET_KEY } from '~/infra/constants/env';
const SECRET_KEY = "YOUR_SECRET";

// Custom JWT authentication middleware
async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ error: "No token provided" });
    }

    return jwt.verify(token, SECRET_KEY, async (err: any, decoded: any) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      req.body.id = decoded.id;

      const user = await prisma.user.findUnique({
        where: { id: req.body.id },
      });

      if (!user) {
        return res.status(400).json({ error: "User not exists" });
      }

      next();
      return;
    });
  }
  return res.status(400).json({ error: "No headers provided" });
}

export { verifyJWT };
