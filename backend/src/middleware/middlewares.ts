import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";
import { User } from "@prisma/client";
import passport from "passport";

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

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: User) => {
    if (err) {
      return next(err); // Pass the error to the error handling middleware
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" }); // Or another appropriate response
    }
    req.user = user; // Make the authenticated user available on the request object
    next();
  })(req, res, next);
};

export { verifyJWT, authenticate };
