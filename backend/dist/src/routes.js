"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./api/users"));
const auth_1 = __importDefault(require("./api/auth"));
const bikePoints_1 = __importDefault(require("./api/bikePoints"));
const bikePointsLists_1 = __importDefault(require("./api/bikePointsLists"));
const apiV1Router = (0, express_1.Router)();
apiV1Router.use("/auth", auth_1.default);
apiV1Router.use("/users", users_1.default);
apiV1Router.use("/bikepoints", bikePoints_1.default);
apiV1Router.use("/bikepointslists", bikePointsLists_1.default);
exports.default = apiV1Router;
