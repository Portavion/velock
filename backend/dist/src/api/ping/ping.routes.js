import { Router } from "express";
const pingRoutes = Router();
import pingHandler from "./ping.handler.js";
pingRoutes.get("/", pingHandler.getPing);
export default pingRoutes;
