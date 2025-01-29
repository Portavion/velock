-- AlterTable
ALTER TABLE "BikePointList" ADD COLUMN     "bikePointsIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
