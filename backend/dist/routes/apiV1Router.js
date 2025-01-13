"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const apiV1Router = (0, express_1.Router)();
apiV1Router.use("/users", userRouter_1.default);
exports.default = apiV1Router;
