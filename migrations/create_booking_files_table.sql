-- Create BookingFile table for storing file metadata
-- Files are stored in Supabase Storage bucket, this table stores the references

CREATE TABLE IF NOT EXISTS public."BookingFile" (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  "bookingId" TEXT NOT NULL,
  "fileType" TEXT NOT NULL, -- 'unedited-photos', 'edited-photos', 'videos', 'virtual-tour', 'floor-plan'
  "fileName" TEXT NOT NULL,
  "fileUrl" TEXT NOT NULL, -- Supabase storage URL
  "fileSize" BIGINT NOT NULL, -- in bytes
  "mimeType" TEXT NOT NULL,
  "uploadedBy" UUID NOT NULL, -- photographer who uploaded
  "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),

  CONSTRAINT "BookingFile_pkey" PRIMARY KEY (id),
  CONSTRAINT "BookingFile_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON DELETE CASCADE,
  CONSTRAINT "BookingFile_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES public."User"(id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS "idx_bookingfile_bookingid" ON public."BookingFile"("bookingId");
CREATE INDEX IF NOT EXISTS "idx_bookingfile_filetype" ON public."BookingFile"("fileType");
CREATE INDEX IF NOT EXISTS "idx_bookingfile_uploadedby" ON public."BookingFile"("uploadedBy");

-- Add comment to table
COMMENT ON TABLE public."BookingFile" IS 'Stores metadata for files uploaded by photographers for bookings. Actual files are stored in Supabase Storage.';

-- Add file type constraint
ALTER TABLE public."BookingFile"
ADD CONSTRAINT "BookingFile_fileType_check"
CHECK ("fileType" IN ('unedited-photos', 'edited-photos', 'videos', 'virtual-tour', 'floor-plan'));
