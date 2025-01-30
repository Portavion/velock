import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
dotenv.config();
const authHandler = {
    getToken: async (req, res, next) => {
        try {
            const user = req.body;
            const { email, password } = user;
            let isPasswordMatched;
            const isUserExist = await prisma.user.findUnique({
                where: { email: email },
            });
            if (!isUserExist) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
            }
            else {
                isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
            }
            if (!isPasswordMatched) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: "wrong password",
                });
            }
            const token = jwt.sign({ id: isUserExist?.id, email: isUserExist?.email }, process.env.SECRET_KEY || "catsanddogs", {
                expiresIn: "7d",
            });
            res.status(200).json({
                status: 200,
                success: true,
                message: "login successful",
                token: token,
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
            next(error);
        }
    },
};
export default authHandler;
