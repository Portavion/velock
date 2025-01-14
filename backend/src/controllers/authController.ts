import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

dotenv.config();

interface authController {
  getToken(req: Request, res: Response): Promise<void>;
}

const authController: authController = {
  getToken: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.body;
      const { email, password } = user;

      const isUserExist = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!isUserExist) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User not found",
        });
        return;
      }

      const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExist.password,
      );

      if (!isPasswordMatched) {
        res.status(400).json({
          status: 400,
          success: false,
          message: "wrong password",
        });
        return;
      }

      // ** if the email and password is valid create a token
      /*
    To create a token JsonWebToken (JWT) receive's 3 parameter
    1. Payload -  This contains the claims or data you want to include in the token.
    2. Secret Key - A secure key known only to the server used for signing the token.
    3. expiration -  Additional settings like token expiration or algorithm selection.
    */
      //TODO: SECRET from dotenv
      // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration

      // ** This is our JWT Token
      const token = jwt.sign(
        { id: isUserExist?.id, email: isUserExist?.email },
        process.env.SECRET_KEY || "catsanddogs",
        {
          expiresIn: "7d",
        },
      );

      // send the response
      res.status(200).json({
        status: 200,
        success: true,
        message: "login successful",
        token: token,
      });
    } catch (error: any) {
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  },
};

export default authController;
