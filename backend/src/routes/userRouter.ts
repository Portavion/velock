//./routes/userRouter.ts
import { Router } from "express";
import userController from "../controllers/userController";
import passport from "passport";

const userRouter = Router();
// GET
userRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getUsers,
);

//POST
//TODO: refactor to auth/signup
userRouter.post("/", userController.createUser);

//PUT

//DELETE

export default userRouter;
