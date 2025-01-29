"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
dotenv_1.default.config();
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
            const token = jsonwebtoken_1.default.sign({ id: isUserExist?.id, email: isUserExist?.email }, process.env.SECRET_KEY || "catsanddogs", {
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
exports.default = authHandler;
