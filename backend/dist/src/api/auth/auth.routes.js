"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_handler_1 = __importDefault(require("./auth.handler"));
const express_1 = require("express");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/login", auth_handler_1.default.getToken);
exports.default = authRoutes;
