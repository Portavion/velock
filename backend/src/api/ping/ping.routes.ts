import { Router } from "express";
const pingRoutes = Router();

import pingHandler from "./ping.handler.js";

// GET
pingRoutes.get("/", pingHandler.getPing);

//POST

//PUT

//DELETE

export default pingRoutes;
