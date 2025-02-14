import authHandler from "./auth.handler.js";
import { authenticate } from "../../middleware/middlewares.js";
import { Router } from "express";
const authRoutes = Router();
authRoutes.get("/istokenvalid", authenticate, authHandler.isTokenValid);
authRoutes.post("/login", authHandler.getToken);
export default authRoutes;
