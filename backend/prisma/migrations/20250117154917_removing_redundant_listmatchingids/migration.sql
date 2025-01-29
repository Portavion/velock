/*
  Warnings:

  - You are about to drop the `BikePointListItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BikePointListItem" DROP CONSTRAINT "BikePointListItem_bikePointId_fkey";

-- DropForeignKey
ALTER TABLE "BikePointListItem" DROP CONSTRAINT "BikePointListItem_bikePointListId_fkey";

-- DropTable
DROP TABLE "BikePointListItem";
