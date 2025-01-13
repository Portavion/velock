"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter_1 = __importDefault(require("./userRouter"));
const apiV1Router_1 = __importDefault(require("./apiV1Router"));
exports.default = {
    user: userRouter_1.default,
    apiV1Router: apiV1Router_1.default,
};
