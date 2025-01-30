import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function selectAllBikePointsLists(userId) {
    return await prisma.bikePointList.findMany({ where: { userId: userId } });
}
async function createBikePointsList(listName, userId) {
    const newBikePointList = await prisma.bikePointList.create({
        data: { name: listName, userId: userId },
    });
    return newBikePointList;
}
async function updateBikePointsListName(listId, listName, bikePointsIds) {
    return await prisma.bikePointList.update({
        where: { id: listId },
        data: { name: listName, bikePointsIds: bikePointsIds },
    });
}
async function updateBikePointsListAdd(listId, bikePoint) {
    return await prisma.bikePointList.update({
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
        const deleteResponse = await prisma.bikePointList.delete({
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
        const currentList = await prisma.bikePointList.findUnique({
            where: { id: listId },
        });
        const filteredList = currentList?.bikePointsIds.filter((id) => id != bikePointName);
        const deleteResponse = await prisma.bikePointList.update({
            where: { id: listId },
            data: { bikePointsIds: { set: filteredList } },
        });
        return deleteResponse;
    }
}
export { selectAllBikePointsLists, createBikePointsList, deleteBikePointsList, updateBikePointsListName, updateBikePointsListAdd, deleteBikePoint, };
