/*
  Warnings:

  - You are about to drop the column `bikes` on the `BikePoint` table. All the data in the column will be lost.
  - You are about to drop the column `docks` on the `BikePoint` table. All the data in the column will be lost.
  - You are about to drop the column `ebikes` on the `BikePoint` table. All the data in the column will be lost.
  - You are about to drop the column `emptyDocks` on the `BikePoint` table. All the data in the column will be lost.
  - You are about to drop the column `standardBike` on the `BikePoint` table. All the data in the column will be lost.
  - Added the required column `NbBikes` to the `BikePoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NbDocks` to the `BikePoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NbEbikes` to the `BikePoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NbEmptyDocks` to the `BikePoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NbStandardBikes` to the `BikePoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BikePoint" DROP COLUMN "bikes",
DROP COLUMN "docks",
DROP COLUMN "ebikes",
DROP COLUMN "emptyDocks",
DROP COLUMN "standardBike",
ADD COLUMN     "NbBikes" INTEGER NOT NULL,
ADD COLUMN     "NbDocks" INTEGER NOT NULL,
ADD COLUMN     "NbEbikes" INTEGER NOT NULL,
ADD COLUMN     "NbEmptyDocks" INTEGER NOT NULL,
ADD COLUMN     "NbStandardBikes" INTEGER NOT NULL;
