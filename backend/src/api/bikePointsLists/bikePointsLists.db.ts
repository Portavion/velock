import { BikePointList } from "@prisma/client";
import prisma from "../../prisma/prisma";

async function selectAllBikePointsLists(
  userId: number,
): Promise<BikePointList[]> {
  return await prisma.bikePointList.findMany({ where: { userId: userId } });
}

async function createBikePointsList(
  listName: string,
  userId: number,
): Promise<BikePointList> {
  const newBikePointList = await prisma.bikePointList.create({
    data: { name: listName, userId: userId },
  });
  return newBikePointList;
}

async function updateBikePointsList(
  listId: number,
  listName: string,
  bikePointsIds: string[],
): Promise<BikePointList> {
  return await prisma.bikePointList.update({
    where: { id: listId },
    data: { name: listName, bikePointsIds: bikePointsIds },
  });
}

async function deleteBikePointsList(
  listId: number,
  userId: number,
): Promise<BikePointList | null> {
  if (!listId) {
    console.log("invalid name");
    return null;
  } else {
    const deleteResponse = await prisma.bikePointList.delete({
      where: { id: listId, userId: userId },
    });
    return deleteResponse;
  }
}

export {
  selectAllBikePointsLists,
  createBikePointsList,
  deleteBikePointsList,
  updateBikePointsList,
};
