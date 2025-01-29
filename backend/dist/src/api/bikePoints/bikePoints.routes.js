"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bikePointsRoutes = (0, express_1.Router)();
const bikePoints_handler_1 = __importDefault(require("./bikePoints.handler"));
const middlewares_1 = require("../../middleware/middlewares");
bikePointsRoutes.get("/searchAddress", middlewares_1.authenticate, bikePoints_handler_1.default.getBikePointByAdress);
bikePointsRoutes.get("/:id", middlewares_1.authenticate, bikePoints_handler_1.default.getBikePointData);
bikePointsRoutes.get("/", middlewares_1.authenticate, bikePoints_handler_1.default.getAllBikePointsData);
exports.default = bikePointsRoutes;
