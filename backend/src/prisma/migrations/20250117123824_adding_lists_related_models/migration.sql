-- CreateTable
CREATE TABLE "BikePointList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "BikePointList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BikePointListItem" (
    "id" SERIAL NOT NULL,
    "bikePointId" TEXT NOT NULL,
    "bikePointListId" INTEGER NOT NULL,

    CONSTRAINT "BikePointListItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BikePointList" ADD CONSTRAINT "BikePointList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikePointListItem" ADD CONSTRAINT "BikePointListItem_bikePointId_fkey" FOREIGN KEY ("bikePointId") REFERENCES "BikePoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikePointListItem" ADD CONSTRAINT "BikePointListItem_bikePointListId_fkey" FOREIGN KEY ("bikePointListId") REFERENCES "BikePointList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
