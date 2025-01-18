//TODO: refactor config in another  file?
import express, { Application } from "express";
import dotenv from "dotenv";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "./prisma/prisma";
import helmet from "helmet";
import { errorHandler } from "./middleware/middlewares";

import apiV1Router from "./routes";
import { updateBikePointsTable } from "./prisma/populateBikepoints";

dotenv.config();

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || "YOUR_SECRET",
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: payload.id },
        });

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done({ error }, false);
      }
    },
  ),
);

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

setInterval(updateBikePointsTable, 1000 * 30); // updates every 30s: 1000ms * 30s

app.use("/api/v1/", apiV1Router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
