import { Router } from "express";
const userRoutes = Router();

import usersHandler from "./users.handler.js";
import { authenticate } from "../../middleware/middlewares.js";

// GET
userRoutes.get("/", authenticate, usersHandler.getUsers);

//POST
//TODO: refactor to auth/signup
userRoutes.post("/", usersHandler.createUser);

//PUT

//DELETE

export default userRoutes;
