import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "./prisma/prisma";

import apiV1Router from "./routes/apiV1Router";

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log(`Setting up cors ${req.ip}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use("/api/v1/", apiV1Router);

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
