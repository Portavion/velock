//TODO: refactor config in another  file?
import express, { Application } from "express";
import dotenv from "dotenv";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import helmet from "helmet";
import { errorHandler } from "./middleware/middlewares.js";
import cors from "cors";

import apiV1Router from "./routes.js";
import { updateBikePointsTable } from "./prisma/populateBikepoints.js";

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

app.use(
  helmet({
    // crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin requests
  }),
);

// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://bike.portavion.net"], // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  }),
);

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

setInterval(updateBikePointsTable, 1000 * 60 * 120); // updates every 2 hours: 1000ms * 60s * 5

app.use("/api/v1/", apiV1Router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
