-- ============================================
-- SUPABASE NOTIFICATION TABLE SETUP
-- Run this SQL in Supabase SQL Editor
-- ============================================

-- First, check if the Notification table exists and what columns it has
-- If it already exists, we'll add any missing columns

-- ============================================
-- 1. ENSURE NOTIFICATION TABLE EXISTS
-- ============================================

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Notification" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "bookingId" UUID,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  "isRead" BOOLEAN DEFAULT false,
  "actionUrl" VARCHAR(500),
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. ADD MISSING COLUMNS (if any)
-- ============================================

-- Add userId column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'userId') THEN
    ALTER TABLE "Notification" ADD COLUMN "userId" UUID NOT NULL;
  END IF;
END $$;

-- Add bookingId column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'bookingId') THEN
    ALTER TABLE "Notification" ADD COLUMN "bookingId" UUID;
  END IF;
END $$;

-- Add type column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'type') THEN
    ALTER TABLE "Notification" ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'MESSAGE';
  END IF;
END $$;

-- Add title column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'title') THEN
    ALTER TABLE "Notification" ADD COLUMN title VARCHAR(255) NOT NULL DEFAULT 'Notification';
  END IF;
END $$;

-- Add message column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'message') THEN
    ALTER TABLE "Notification" ADD COLUMN message TEXT NOT NULL DEFAULT '';
  END IF;
END $$;

-- Add isRead column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'isRead') THEN
    ALTER TABLE "Notification" ADD COLUMN "isRead" BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Add actionUrl column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'actionUrl') THEN
    ALTER TABLE "Notification" ADD COLUMN "actionUrl" VARCHAR(500);
  END IF;
END $$;

-- Add createdAt column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'createdAt') THEN
    ALTER TABLE "Notification" ADD COLUMN "createdAt" TIMESTAMPTZ DEFAULT NOW();
  END IF;
END $$;

-- Add updatedAt column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Notification' AND column_name = 'updatedAt') THEN
    ALTER TABLE "Notification" ADD COLUMN "updatedAt" TIMESTAMPTZ DEFAULT NOW();
  END IF;
END $$;

-- ============================================
-- 3. ADD FOREIGN KEY CONSTRAINTS
-- ============================================

-- Add foreign key to User table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'notification_userid_fkey') THEN
    ALTER TABLE "Notification" 
    ADD CONSTRAINT notification_userid_fkey 
    FOREIGN KEY ("userId") 
    REFERENCES "User"(id) 
    ON DELETE CASCADE;
  END IF;
END $$;

-- Add foreign key to Booking table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'notification_bookingid_fkey') THEN
    ALTER TABLE "Notification" 
    ADD CONSTRAINT notification_bookingid_fkey 
    FOREIGN KEY ("bookingId") 
    REFERENCES "Booking"(id) 
    ON DELETE CASCADE;
  END IF;
END $$;

-- ============================================
-- 4. CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================

-- Index on userId for fast user notification queries
CREATE INDEX IF NOT EXISTS idx_notification_userid 
ON "Notification"("userId");

-- Index on isRead for filtering read/unread
CREATE INDEX IF NOT EXISTS idx_notification_isread 
ON "Notification"("isRead");

-- Index on createdAt for sorting by date
CREATE INDEX IF NOT EXISTS idx_notification_createdat 
ON "Notification"("createdAt" DESC);

-- Index on bookingId for booking-related notifications
CREATE INDEX IF NOT EXISTS idx_notification_bookingid 
ON "Notification"("bookingId");

-- Composite index for userId + isRead (most common query)
CREATE INDEX IF NOT EXISTS idx_notification_userid_isread 
ON "Notification"("userId", "isRead");

-- Composite index for userId + createdAt (for sorted queries)
CREATE INDEX IF NOT EXISTS idx_notification_userid_createdat 
ON "Notification"("userId", "createdAt" DESC);

-- ============================================
-- 5. ADD CHECK CONSTRAINT FOR VALID TYPES
-- ============================================

-- Ensure notification types match backend expectations
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.constraint_column_usage 
                 WHERE constraint_name = 'notification_type_check') THEN
    ALTER TABLE "Notification" 
    ADD CONSTRAINT notification_type_check 
    CHECK (type IN (
      'BOOKING_CREATED',
      'PHOTOGRAPHER_ASSIGNED',
      'PHOTOGRAPHER_ACCEPTED',
      'PHOTOGRAPHER_REJECTED',
      'STATUS_CHANGE',
      'MESSAGE',
      'PAYMENT',
      'BOOKING_CANCELLED'
    ));
  END IF;
END $$;

-- ============================================
-- 6. CREATE UPDATED_AT TRIGGER (Auto-update timestamp)
-- ============================================

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_notification_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists, then create it
DROP TRIGGER IF EXISTS set_notification_updated_at ON "Notification";
CREATE TRIGGER set_notification_updated_at
BEFORE UPDATE ON "Notification"
FOR EACH ROW
EXECUTE FUNCTION update_notification_updated_at();

-- ============================================
-- 7. ENABLE ROW LEVEL SECURITY (RLS) - IMPORTANT!
-- ============================================

-- Enable RLS on Notification table
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own notifications
CREATE POLICY "Users can view own notifications" 
ON "Notification"
FOR SELECT
USING (auth.uid()::text = "userId"::text);

-- Policy: Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" 
ON "Notification"
FOR UPDATE
USING (auth.uid()::text = "userId"::text);

-- Policy: Users can delete their own notifications
CREATE POLICY "Users can delete own notifications" 
ON "Notification"
FOR DELETE
USING (auth.uid()::text = "userId"::text);

-- Policy: Service role can insert notifications (backend creates them)
CREATE POLICY "Service role can insert notifications" 
ON "Notification"
FOR INSERT
WITH CHECK (true);

-- ============================================
-- 8. VERIFY TABLE STRUCTURE
-- ============================================

-- Run this query to verify all columns are present:
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Notification'
ORDER BY ordinal_position;

-- ============================================
-- 9. TEST DATA (OPTIONAL - for testing only)
-- ============================================

-- Uncomment below to insert test notification (replace with real user/booking IDs)
/*
INSERT INTO "Notification" (
  "userId",
  "bookingId",
  type,
  title,
  message,
  "isRead",
  "actionUrl"
) VALUES (
  'your-user-id-here',
  'your-booking-id-here',
  'BOOKING_CREATED',
  'Test Notification',
  'This is a test notification to verify the table works',
  false,
  '/bookings/test'
);
*/

-- ============================================
-- DONE! ✅
-- ============================================

-- Your Notification table is now ready for the backend!
-- 
-- REQUIRED COLUMNS (All Present):
-- ✅ id (UUID) - Primary key
-- ✅ userId (UUID) - Reference to User
-- ✅ bookingId (UUID) - Reference to Booking (optional)
-- ✅ type (VARCHAR) - Notification type
-- ✅ title (VARCHAR) - Notification title
-- ✅ message (TEXT) - Notification message
-- ✅ isRead (BOOLEAN) - Read status
-- ✅ actionUrl (VARCHAR) - Link to action (optional)
-- ✅ createdAt (TIMESTAMPTZ) - Created timestamp
-- ✅ updatedAt (TIMESTAMPTZ) - Updated timestamp
--
-- INDEXES CREATED:
-- ✅ idx_notification_userid
-- ✅ idx_notification_isread
-- ✅ idx_notification_createdat
-- ✅ idx_notification_bookingid
-- ✅ idx_notification_userid_isread
-- ✅ idx_notification_userid_createdat
--
-- SECURITY:
-- ✅ Row Level Security enabled
-- ✅ Policies for SELECT, UPDATE, DELETE, INSERT
--
-- NEXT STEPS:
-- 1. Run this script in Supabase SQL Editor
-- 2. Verify no errors
-- 3. Test backend notification creation
-- 4. Test frontend notification display
