import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { User } from "@prisma/client";
import passport from "passport";

dotenv.config();

// Custom
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: User) => {
    if (err) {
      return next(err); // Pass the error to the error handling middleware
    }
    if (!user) {
      res.status(401).json({ message: "Unauthorized" }); // Or another appropriate response
      return;
    }
    req.user = user; // Make the authenticated user available on the request object
    next();
  })(req, res, next);
};

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
  return;
};

export { authenticate, errorHandler };
