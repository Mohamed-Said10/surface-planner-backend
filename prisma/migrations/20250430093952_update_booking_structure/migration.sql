-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "selectedPackage" JSONB NOT NULL,
    "isLoading" BOOLEAN NOT NULL,
    "propertyType" TEXT NOT NULL,
    "propertySize" TEXT NOT NULL,
    "propertyAddress" JSONB NOT NULL,
    "addOns" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
