"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = (0, express_1.Router)();
const users_handler_1 = __importDefault(require("./users.handler"));
const middlewares_1 = require("../../middleware/middlewares");
userRoutes.get("/", middlewares_1.authenticate, users_handler_1.default.getUsers);
userRoutes.post("/", users_handler_1.default.createUser);
exports.default = userRoutes;
