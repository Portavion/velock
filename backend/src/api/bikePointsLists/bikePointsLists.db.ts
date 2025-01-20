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
  listName: string,
  userId: number,
): Promise<void> {
  await prisma.bikePointList.deleteMany({
    where: { name: listName, userId: userId },
  });
}

export {
  selectAllBikePointsLists,
  createBikePointsList,
  deleteBikePointsList,
  updateBikePointsList,
};
