/*
  Warnings:

  - You are about to drop the column `addOns` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `propertyAddress` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `selectedPackage` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "addOns",
DROP COLUMN "propertyAddress",
DROP COLUMN "selectedPackage",
ADD COLUMN     "propertyAddressId" INTEGER,
ADD COLUMN     "selectedPackageId" INTEGER;

-- CreateTable
CREATE TABLE "SelectedPackage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "pricePerExtra" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SelectedPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyAddress" (
    "id" SERIAL NOT NULL,
    "buildingName" TEXT NOT NULL,
    "unitNumber" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "PropertyAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddOn" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AddOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookingAddOns" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookingAddOns_AB_unique" ON "_BookingAddOns"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingAddOns_B_index" ON "_BookingAddOns"("B");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_selectedPackageId_fkey" FOREIGN KEY ("selectedPackageId") REFERENCES "SelectedPackage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_propertyAddressId_fkey" FOREIGN KEY ("propertyAddressId") REFERENCES "PropertyAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingAddOns" ADD CONSTRAINT "_BookingAddOns_A_fkey" FOREIGN KEY ("A") REFERENCES "AddOn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingAddOns" ADD CONSTRAINT "_BookingAddOns_B_fkey" FOREIGN KEY ("B") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
