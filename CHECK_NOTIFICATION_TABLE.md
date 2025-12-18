# 🔍 Quick Check - Does Your Notification Table Have Everything?

Run this single query in Supabase SQL Editor to check everything at once:

```sql
-- ============================================
-- COMPREHENSIVE NOTIFICATION TABLE CHECK
-- ============================================

-- Check 1: Does table exist?
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Notification')
    THEN '✅ Table exists'
    ELSE '❌ Table does NOT exist - Run setup script!'
  END AS table_status;

-- Check 2: What columns exist?
SELECT 
  column_name,
  data_type,
  CASE WHEN is_nullable = 'YES' THEN '✅ Nullable' ELSE '❌ NOT NULL' END AS nullable_status,
  column_default
FROM information_schema.columns
WHERE table_name = 'Notification'
ORDER BY ordinal_position;

-- Check 3: Are foreign keys set up?
SELECT
  '✅ ' || constraint_name AS constraint_status,
  ccu.table_name || '(' || ccu.column_name || ')' AS references
FROM information_schema.table_constraints AS tc
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'Notification'
  AND tc.constraint_type = 'FOREIGN KEY';

-- Check 4: Are indexes created?
SELECT 
  '✅ ' || indexname AS index_status
FROM pg_indexes
WHERE tablename = 'Notification';

-- Check 5: Is RLS enabled?
SELECT
  schemaname,
  tablename,
  CASE 
    WHEN rowsecurity THEN '✅ RLS is ENABLED'
    ELSE '❌ RLS is DISABLED - Run setup script!'
  END AS rls_status
FROM pg_tables
WHERE tablename = 'Notification';

-- Check 6: What RLS policies exist?
SELECT
  '✅ ' || policyname AS policy_name,
  cmd AS policy_type
FROM pg_policies
WHERE tablename = 'Notification';
```

---

## Expected Results:

### ✅ Table Status
```
✅ Table exists
```

### ✅ Columns (should have 10)
```
id          | uuid        | ❌ NOT NULL | uuid_generate_v4()
userId      | uuid        | ❌ NOT NULL | -
bookingId   | uuid        | ✅ Nullable | -
type        | varchar     | ❌ NOT NULL | -
title       | varchar     | ❌ NOT NULL | -
message     | text        | ❌ NOT NULL | -
isRead      | boolean     | ❌ NOT NULL | false
actionUrl   | varchar     | ✅ Nullable | -
createdAt   | timestamptz | ❌ NOT NULL | now()
updatedAt   | timestamptz | ❌ NOT NULL | now()
```

### ✅ Foreign Keys (should have 2)
```
✅ notification_userid_fkey   → User(id)
✅ notification_bookingid_fkey → Booking(id)
```

### ✅ Indexes (should have 6+)
```
✅ notification_pkey
✅ idx_notification_userid
✅ idx_notification_isread
✅ idx_notification_createdat
✅ idx_notification_bookingid
✅ idx_notification_userid_isread
✅ idx_notification_userid_createdat
```

### ✅ RLS Status
```
✅ RLS is ENABLED
```

### ✅ RLS Policies (should have 4)
```
✅ Users can view own notifications     | SELECT
✅ Users can update own notifications   | UPDATE
✅ Users can delete own notifications   | DELETE
✅ Service role can insert notifications | INSERT
```

---

## 🚨 What If Something Is Missing?

### Missing Columns?
→ Run `SUPABASE_NOTIFICATION_TABLE_SETUP.sql`

### Missing Foreign Keys?
→ Run `SUPABASE_NOTIFICATION_TABLE_SETUP.sql`

### Missing Indexes?
→ Run `SUPABASE_NOTIFICATION_TABLE_SETUP.sql`

### RLS Disabled?
→ Run `SUPABASE_NOTIFICATION_TABLE_SETUP.sql`

### Missing Policies?
→ Run `SUPABASE_NOTIFICATION_TABLE_SETUP.sql`

**The setup script is safe to run multiple times!**

---

## ⚡ Quick Test - Insert Sample Notification

After verifying structure, test with a real notification:

```sql
-- Step 1: Get a user ID from your database
SELECT id, email, role FROM "User" LIMIT 3;

-- Step 2: Copy a user ID and insert test notification
-- Replace 'PASTE_USER_ID_HERE' with actual user ID from above
INSERT INTO "Notification" (
  "userId",
  type,
  title,
  message,
  "isRead",
  "actionUrl",
  "createdAt",
  "updatedAt"
) VALUES (
  'PASTE_USER_ID_HERE',
  'BOOKING_CREATED',
  'Test Notification',
  'This is a test notification to verify everything works!',
  false,
  '/dashboard',
  NOW(),
  NOW()
) RETURNING *;

-- Step 3: Verify it was created
SELECT * FROM "Notification" ORDER BY "createdAt" DESC LIMIT 1;

-- Step 4: Clean up test data (optional)
-- DELETE FROM "Notification" WHERE title = 'Test Notification';
```

---

## ✅ All Good? You're Ready!

If all checks pass, you're ready to:
1. ✅ Start your backend: `npm run dev`
2. ✅ Create a booking as client
3. ✅ Check if admin receives notification
4. ✅ Check notification bell in frontend
5. ✅ Test mark as read functionality

---

## 📸 From Your Screenshot

I can see your table has these columns visible:
- ✅ `id` (UUID)
- ✅ `createdAt` (timestamptz)
- ✅ `updatedAt` (timestamptz)

**Make sure you also have:**
- userId
- bookingId
- type
- title
- message
- isRead
- actionUrl

*(Scroll right in Table Editor to see all columns)*

---

**Ready to test? Let's go! 🚀**
