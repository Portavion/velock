"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAllBikePointsLists = selectAllBikePointsLists;
exports.createBikePointsList = createBikePointsList;
exports.deleteBikePointsList = deleteBikePointsList;
exports.updateBikePointsListName = updateBikePointsListName;
exports.updateBikePointsListAdd = updateBikePointsListAdd;
exports.deleteBikePoint = deleteBikePoint;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
async function selectAllBikePointsLists(userId) {
    return await prisma_1.default.bikePointList.findMany({ where: { userId: userId } });
}
async function createBikePointsList(listName, userId) {
    const newBikePointList = await prisma_1.default.bikePointList.create({
        data: { name: listName, userId: userId },
    });
    return newBikePointList;
}
async function updateBikePointsListName(listId, listName, bikePointsIds) {
    return await prisma_1.default.bikePointList.update({
        where: { id: listId },
        data: { name: listName, bikePointsIds: bikePointsIds },
    });
}
async function updateBikePointsListAdd(listId, bikePoint) {
    return await prisma_1.default.bikePointList.update({
        where: { id: listId },
        data: { bikePointsIds: { push: bikePoint } },
    });
}
async function deleteBikePointsList(listId, userId) {
    if (!listId) {
        console.log("invalid name");
        return null;
    }
    else {
        const deleteResponse = await prisma_1.default.bikePointList.delete({
            where: { id: listId, userId: userId },
        });
        return deleteResponse;
    }
}
async function deleteBikePoint(listId, bikePointName) {
    if (!listId || !bikePointName) {
        console.log("invalid id or name");
        return null;
    }
    else {
        const currentList = await prisma_1.default.bikePointList.findUnique({
            where: { id: listId },
        });
        const filteredList = currentList?.bikePointsIds.filter((id) => id != bikePointName);
        const deleteResponse = await prisma_1.default.bikePointList.update({
            where: { id: listId },
            data: { bikePointsIds: { set: filteredList } },
        });
        return deleteResponse;
    }
}
