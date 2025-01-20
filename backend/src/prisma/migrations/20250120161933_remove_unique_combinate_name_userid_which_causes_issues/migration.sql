-- DropForeignKey
ALTER TABLE "BikePointList" DROP CONSTRAINT "BikePointList_userId_fkey";

-- DropIndex
DROP INDEX "BikePointList_userId_name_key";

-- AlterTable
ALTER TABLE "BikePointList" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BikePointList" ADD CONSTRAINT "BikePointList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
