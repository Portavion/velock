-- CreateTable
CREATE TABLE "BikePoint" (
    "id" SERIAL NOT NULL,
    "commonName" TEXT NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "bikes" INTEGER NOT NULL,
    "emptyDocks" INTEGER NOT NULL,
    "docks" INTEGER NOT NULL,
    "standardBike" INTEGER NOT NULL,
    "ebikes" INTEGER NOT NULL,
    "lat" INTEGER NOT NULL,
    "lon" INTEGER NOT NULL,

    CONSTRAINT "BikePoint_pkey" PRIMARY KEY ("id")
);
