"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bikePointsLists_db_1 = require("./bikePointsLists.db");
const isUserExists_1 = __importDefault(require("../../utils/isUserExists"));
const bikePointsListsHandler = {
    getAllBikePointsLists: async (req, res, next) => {
        const user = req.user;
        if (!user) {
            res.status(401).json({
                message: "Error: List creation requires a name and a user id ",
            });
        }
        const userId = Number(user.id);
        try {
            const bikePointsLists = await (0, bikePointsLists_db_1.selectAllBikePointsLists)(userId);
            res.status(200).json(bikePointsLists);
        }
        catch (error) {
            next(error);
        }
    },
    createBikePointsList: async (req, res, next) => {
        const listName = req.body.listName;
        const user = req.user;
        if (!listName || !user) {
            res.status(401).json({
                message: "Error: List creation requires a name and a user id ",
            });
        }
        const isUserExist = await (0, isUserExists_1.default)(user?.id);
        if (!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Adding lists requires to be logged.",
            });
        }
        else {
            try {
                const newBikePointList = await (0, bikePointsLists_db_1.createBikePointsList)(listName, user?.id);
                res.status(200).json(newBikePointList);
            }
            catch (error) {
                next(error);
            }
        }
    },
    updateBikePointsListName: async (req, res, next) => {
        const listName = req.body.listName;
        const user = req.user;
        const listId = parseInt(req.body.listId);
        const bikePointsList = req.body.bikePointsList || [];
        if (!listName || !user) {
            res.status(401).json({
                message: "Error: List creation requires a name and a user id ",
            });
        }
        const isUserExist = await (0, isUserExists_1.default)(user?.id);
        if (!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Updating lists requires to be logged.",
            });
        }
        else {
            try {
                const updatedBikePointList = await (0, bikePointsLists_db_1.updateBikePointsListName)(listId, listName, bikePointsList.length >= 1 ? bikePointsList : []);
                res.status(200).json(updatedBikePointList);
            }
            catch (error) {
                next(error);
            }
        }
    },
    updateBikePointsListAdd: async (req, res, next) => {
        const user = req.user;
        const listId = Number(req.body.listId);
        const bikePoint = req.body.bikePoint || "";
        if (!listId || !user || !bikePoint) {
            res.status(401).json({
                message: "Error: List creation requires a bike point list and a user id ",
            });
        }
        const isUserExist = await (0, isUserExists_1.default)(user?.id);
        if (!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Updating lists requires to be logged.",
            });
        }
        else {
            try {
                const updatedBikePointList = await (0, bikePointsLists_db_1.updateBikePointsListAdd)(listId, bikePoint);
                res.status(200).json(updatedBikePointList);
            }
            catch (error) {
                next(error);
            }
        }
    },
    deleteBikePointsList: async (req, res, next) => {
        const listId = Number(req.body.listId);
        const user = req.user;
        if (!listId || !user) {
            res.status(401).json({
                message: "Error: List creation requires an id and a user id ",
            });
        }
        const isUserExist = await (0, isUserExists_1.default)(user?.id);
        if (!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Adding lists requires to be logged.",
            });
        }
        else {
            try {
                const deletedBikePointList = await (0, bikePointsLists_db_1.deleteBikePointsList)(listId, user?.id);
                res.status(200).json(deletedBikePointList);
            }
            catch (error) {
                next(error);
            }
        }
    },
    deleteBikePoint: async (req, res, next) => {
        const listId = Number(req.body.listId);
        const bikePointName = req.body.bikePoint;
        const user = req.user;
        if (!listId || !user || !bikePointName) {
            res.status(401).json({
                message: "Error: List creation requires an id and a user id ",
            });
        }
        const isUserExist = await (0, isUserExists_1.default)(user?.id);
        if (!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Adding lists requires to be logged.",
            });
        }
        else {
            try {
                const deletedBikePoint = await (0, bikePointsLists_db_1.deleteBikePoint)(listId, bikePointName);
                res.status(200).json(deletedBikePoint);
            }
            catch (error) {
                next(error);
            }
        }
    },
};
exports.default = bikePointsListsHandler;
