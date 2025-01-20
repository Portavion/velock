/*
  Warnings:

  - Changed the type of `bikes` on the `BikePoint` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `emptyDocks` on the `BikePoint` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `docks` on the `BikePoint` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `standardBike` on the `BikePoint` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ebikes` on the `BikePoint` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BikePoint" DROP COLUMN "bikes",
ADD COLUMN     "bikes" INTEGER NOT NULL,
DROP COLUMN "emptyDocks",
ADD COLUMN     "emptyDocks" INTEGER NOT NULL,
DROP COLUMN "docks",
ADD COLUMN     "docks" INTEGER NOT NULL,
DROP COLUMN "standardBike",
ADD COLUMN     "standardBike" INTEGER NOT NULL,
DROP COLUMN "ebikes",
ADD COLUMN     "ebikes" INTEGER NOT NULL;
