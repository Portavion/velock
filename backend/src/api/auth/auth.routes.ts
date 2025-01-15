import authHandler from "./auth.handler";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/login", authHandler.getToken);

export default authRoutes;
