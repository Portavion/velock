import authHandler from "./auth.handler.js";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/login", authHandler.getToken);

export default authRoutes;
