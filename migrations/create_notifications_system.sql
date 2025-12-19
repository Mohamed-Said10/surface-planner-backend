-- ============================================================================
-- NOTIFICATION SYSTEM - COMPLETE SETUP
-- ============================================================================
-- This migration creates the complete notification system including:
-- 1. Notification table with all columns
-- 2. Foreign keys to User and Booking tables
-- 3. Indexes for performance
-- 4. Row Level Security (RLS) policies
-- 5. Real-time replication for live updates
-- 6. Auto-update trigger for updatedAt timestamp
-- 7. Validation constraints
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE NOTIFICATION TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public."Notification" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "bookingId" UUID,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "actionUrl" VARCHAR(500),
  priority VARCHAR(20) DEFAULT 'MEDIUM',
  metadata JSONB,
  "readAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- STEP 2: ADD FOREIGN KEYS
-- ============================================================================

-- Foreign key to User table (delete notifications when user is deleted)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'notification_userid_fkey'
  ) THEN
    ALTER TABLE public."Notification"
      ADD CONSTRAINT notification_userid_fkey 
      FOREIGN KEY ("userId") 
      REFERENCES public."User"(id) 
      ON DELETE CASCADE;
  END IF;
END $$;

-- Foreign key to Booking table (set bookingId to null when booking is deleted)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'notification_bookingid_fkey'
  ) THEN
    ALTER TABLE public."Notification"
      ADD CONSTRAINT notification_bookingid_fkey 
      FOREIGN KEY ("bookingId") 
      REFERENCES public."Booking"(id) 
      ON DELETE SET NULL;
  END IF;
END $$;

-- ============================================================================
-- STEP 3: CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index on userId for fast filtering by user
CREATE INDEX IF NOT EXISTS idx_notification_userid 
ON public."Notification"("userId");

-- Index on isRead for filtering unread notifications
CREATE INDEX IF NOT EXISTS idx_notification_isread 
ON public."Notification"("isRead");

-- Index on createdAt for sorting by date
CREATE INDEX IF NOT EXISTS idx_notification_createdat 
ON public."Notification"("createdAt" DESC);

-- Composite index for user + read status queries
CREATE INDEX IF NOT EXISTS idx_notification_user_isread 
ON public."Notification"("userId", "isRead");

-- Composite index for user + createdAt queries
CREATE INDEX IF NOT EXISTS idx_notification_user_createdat 
ON public."Notification"("userId", "createdAt" DESC);

-- Index on bookingId for filtering by booking
CREATE INDEX IF NOT EXISTS idx_notification_bookingid 
ON public."Notification"("bookingId") 
WHERE "bookingId" IS NOT NULL;

-- ============================================================================
-- STEP 4: ADD VALIDATION CONSTRAINTS
-- ============================================================================

-- Constraint: Only allow valid notification types
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'notification_type_check'
  ) THEN
    ALTER TABLE public."Notification"
      ADD CONSTRAINT notification_type_check
      CHECK (type IN (
        'BOOKING_CREATED',
        'PHOTOGRAPHER_ASSIGNED',
        'PHOTOGRAPHER_ACCEPTED',
        'PHOTOGRAPHER_REJECTED',
        'STATUS_CHANGE',
        'MESSAGE',
        'PAYMENT',
        'BOOKING_CANCELLED',
        'WORK_COMPLETED'
      ));
  END IF;
END $$;

-- Constraint: Only allow valid priority levels
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'notification_priority_check'
  ) THEN
    ALTER TABLE public."Notification"
      ADD CONSTRAINT notification_priority_check
      CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT'));
  END IF;
END $$;

-- ============================================================================
-- STEP 5: CREATE AUTO-UPDATE TRIGGER FOR updatedAt
-- ============================================================================

-- Function to automatically update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_notification_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_notification_timestamp ON public."Notification";

CREATE TRIGGER update_notification_timestamp
  BEFORE UPDATE ON public."Notification"
  FOR EACH ROW
  EXECUTE FUNCTION update_notification_timestamp();

-- ============================================================================
-- STEP 6: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on Notification table
ALTER TABLE public."Notification" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own notifications" ON public."Notification";
DROP POLICY IF EXISTS "Users can update their own notifications" ON public."Notification";
DROP POLICY IF EXISTS "Users can delete their own notifications" ON public."Notification";
DROP POLICY IF EXISTS "Service role can insert notifications" ON public."Notification";
DROP POLICY IF EXISTS "Service role full access" ON public."Notification";

-- Policy: Users can view only their own notifications
CREATE POLICY "Users can view their own notifications"
  ON public."Notification"
  FOR SELECT
  USING (auth.uid()::text = "userId");

-- Policy: Users can update only their own notifications (mark as read)
CREATE POLICY "Users can update their own notifications"
  ON public."Notification"
  FOR UPDATE
  USING (auth.uid()::text = "userId")
  WITH CHECK (auth.uid()::text = "userId");

-- Policy: Users can delete only their own notifications
CREATE POLICY "Users can delete their own notifications"
  ON public."Notification"
  FOR DELETE
  USING (auth.uid()::text = "userId");

-- Policy: Service role (backend) can insert notifications for any user
CREATE POLICY "Service role can insert notifications"
  ON public."Notification"
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Policy: Service role has full access (for backend operations)
CREATE POLICY "Service role full access"
  ON public."Notification"
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- STEP 7: ENABLE SUPABASE REAL-TIME REPLICATION
-- ============================================================================

-- Set REPLICA IDENTITY FULL to include all columns in DELETE events
-- This allows real-time listeners to receive the deleted notification data
ALTER TABLE public."Notification" REPLICA IDENTITY FULL;

-- Add Notification table to the real-time publication
-- This enables real-time updates via Supabase's real-time feature
DO $$
BEGIN
  -- Check if table is already in publication
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'Notification'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public."Notification";
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    -- If publication doesn't exist, it will be created by Supabase
    RAISE NOTICE 'Could not add table to supabase_realtime publication. This is expected if real-time is not yet enabled in Supabase Dashboard.';
END $$;

-- ============================================================================
-- STEP 8: ADD HELPFUL COMMENTS
-- ============================================================================

COMMENT ON TABLE public."Notification" IS 'User notifications with real-time support. Supports INSERT, UPDATE, and DELETE events via Supabase real-time.';
COMMENT ON COLUMN public."Notification".id IS 'Unique notification ID';
COMMENT ON COLUMN public."Notification"."userId" IS 'User who receives this notification';
COMMENT ON COLUMN public."Notification"."bookingId" IS 'Related booking (optional)';
COMMENT ON COLUMN public."Notification".type IS 'Type of notification (BOOKING_CREATED, MESSAGE, etc.)';
COMMENT ON COLUMN public."Notification".title IS 'Notification title shown to user';
COMMENT ON COLUMN public."Notification".message IS 'Notification message content';
COMMENT ON COLUMN public."Notification"."isRead" IS 'Whether user has read this notification';
COMMENT ON COLUMN public."Notification"."actionUrl" IS 'URL to navigate when user clicks notification';
COMMENT ON COLUMN public."Notification".priority IS 'Notification priority level (LOW, MEDIUM, HIGH, URGENT)';
COMMENT ON COLUMN public."Notification".metadata IS 'Additional JSON metadata';
COMMENT ON COLUMN public."Notification"."readAt" IS 'Timestamp when notification was marked as read';
COMMENT ON COLUMN public."Notification"."createdAt" IS 'When notification was created';
COMMENT ON COLUMN public."Notification"."updatedAt" IS 'When notification was last updated (auto-updated)';

-- ============================================================================
-- STEP 9: GRANT PERMISSIONS
-- ============================================================================

-- Grant permissions for authenticated users (read-only via RLS policies)
GRANT SELECT, UPDATE, DELETE ON public."Notification" TO authenticated;

-- Grant full permissions to service role (backend)
GRANT ALL ON public."Notification" TO service_role;

-- Grant sequence permissions if needed
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these queries after the migration to verify everything is set up correctly:
--
-- 1. Check table exists with all columns:
--    SELECT column_name, data_type, is_nullable, column_default
--    FROM information_schema.columns
--    WHERE table_name = 'Notification'
--    ORDER BY ordinal_position;
--
-- 2. Check foreign keys:
--    SELECT constraint_name, table_name, column_name
--    FROM information_schema.key_column_usage
--    WHERE table_name = 'Notification';
--
-- 3. Check indexes:
--    SELECT indexname, indexdef
--    FROM pg_indexes
--    WHERE tablename = 'Notification';
--
-- 4. Check RLS policies:
--    SELECT policyname, cmd, qual, with_check
--    FROM pg_policies
--    WHERE tablename = 'Notification';
--
-- 5. Check real-time replication:
--    SELECT schemaname, tablename
--    FROM pg_publication_tables
--    WHERE pubname = 'supabase_realtime';
--
-- ============================================================================

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Notification system setup completed successfully!';
  RAISE NOTICE '📋 Next steps:';
  RAISE NOTICE '   1. Verify in Supabase Dashboard: Database → Tables → Notification';
  RAISE NOTICE '   2. Enable real-time in Dashboard: Database → Replication → Enable for Notification';
  RAISE NOTICE '   3. Check all columns, indexes, and policies are present';
  RAISE NOTICE '   4. Test notification creation via API: POST /api/notifications';
  RAISE NOTICE '   5. Test real-time updates: Connect to /api/notifications/stream';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 Your notification system is ready to use!';
END $$;
