/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `BikePointList` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `BikePointList` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BikePointList" DROP CONSTRAINT "BikePointList_userId_fkey";

-- AlterTable
ALTER TABLE "BikePointList" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BikePointList_userId_name_key" ON "BikePointList"("userId", "name");

-- AddForeignKey
ALTER TABLE "BikePointList" ADD CONSTRAINT "BikePointList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
