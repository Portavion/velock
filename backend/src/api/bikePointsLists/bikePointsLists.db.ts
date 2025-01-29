import { BikePointList } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

async function updateBikePointsListName(
  listId: number,
  listName: string,
  bikePointsIds: string[],
): Promise<BikePointList> {
  return await prisma.bikePointList.update({
    where: { id: listId },
    data: { name: listName, bikePointsIds: bikePointsIds },
  });
}

async function updateBikePointsListAdd(
  listId: number,
  bikePoint: string,
): Promise<BikePointList> {
  return await prisma.bikePointList.update({
    where: { id: listId },
    data: { bikePointsIds: { push: bikePoint } },
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

async function deleteBikePoint(
  listId: number,
  bikePointName: string,
): Promise<BikePointList | null> {
  if (!listId || !bikePointName) {
    console.log("invalid id or name");
    return null;
  } else {
    const currentList = await prisma.bikePointList.findUnique({
      where: { id: listId },
    });

    const filteredList = currentList?.bikePointsIds.filter(
      (id) => id != bikePointName,
    );

    const deleteResponse = await prisma.bikePointList.update({
      where: { id: listId },
      data: { bikePointsIds: { set: filteredList } },
    });
    return deleteResponse;
  }
}
export {
  selectAllBikePointsLists,
  createBikePointsList,
  deleteBikePointsList,
  updateBikePointsListName,
  updateBikePointsListAdd,
  deleteBikePoint,
};
