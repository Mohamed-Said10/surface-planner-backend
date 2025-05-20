-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "villaNumber" TEXT,
ALTER COLUMN "buildingName" DROP NOT NULL,
ALTER COLUMN "unitNumber" DROP NOT NULL,
ALTER COLUMN "floor" DROP NOT NULL;
