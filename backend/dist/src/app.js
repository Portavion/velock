import express from "express";
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
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || "YOUR_SECRET",
}, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
        });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        return done({ error }, false);
    }
}));
const app = express();
const port = process.env.PORT || 3000;
app.use(helmet({}));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
setInterval(updateBikePointsTable, 1000 * 30);
app.use("/api/v1/", apiV1Router);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`);
});
