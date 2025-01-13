//./routes/userRouter.ts
import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();
// GET
userRouter.get("/", userController.getUsers);

//POST
userRouter.post("/", userController.createUser);

//PUT

//DELETE

export default userRouter;
