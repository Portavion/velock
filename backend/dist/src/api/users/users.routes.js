import { Router } from "express";
const userRoutes = Router();
import usersHandler from "./users.handler.js";
import { authenticate } from "../../middleware/middlewares.js";
userRoutes.get("/", authenticate, usersHandler.getUsers);
userRoutes.post("/", usersHandler.createUser);
export default userRoutes;
