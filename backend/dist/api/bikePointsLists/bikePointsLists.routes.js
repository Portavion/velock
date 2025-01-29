"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bikePointsLists_handler_1 = __importDefault(require("./bikePointsLists.handler"));
const middlewares_1 = require("../../middleware/middlewares");
const bikePointsListsRoutes = (0, express_1.Router)();
bikePointsListsRoutes.get("/", middlewares_1.authenticate, bikePointsLists_handler_1.default.getAllBikePointsLists);
bikePointsListsRoutes.post("/", middlewares_1.authenticate, bikePointsLists_handler_1.default.createBikePointsList);
bikePointsListsRoutes.put("/name", middlewares_1.authenticate, bikePointsLists_handler_1.default.updateBikePointsListName);
bikePointsListsRoutes.put("/", middlewares_1.authenticate, bikePointsLists_handler_1.default.updateBikePointsListAdd);
bikePointsListsRoutes.delete("/", middlewares_1.authenticate, bikePointsLists_handler_1.default.deleteBikePointsList);
bikePointsListsRoutes.delete("/name", middlewares_1.authenticate, bikePointsLists_handler_1.default.deleteBikePoint);
exports.default = bikePointsListsRoutes;
