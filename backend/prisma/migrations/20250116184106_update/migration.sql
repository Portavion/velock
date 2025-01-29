/*
  Warnings:

  - The primary key for the `BikePoint` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BikePoint" DROP CONSTRAINT "BikePoint_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BikePoint_pkey" PRIMARY KEY ("id");
