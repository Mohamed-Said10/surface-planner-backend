# 🎯 Supabase Notification Table Setup - Step by Step

## ✅ What You Already Have
Looking at your screenshot, you already have a `Notification` table! Great start! 
Now we just need to make sure it has all the right columns.

---

## 📋 Required Columns Checklist

Your `Notification` table MUST have these columns:

| Column Name | Type | Nullable | Default | Purpose |
|------------|------|----------|---------|---------|
| `id` | UUID | NO | uuid_generate_v4() | Primary key |
| `userId` | UUID | NO | - | Which user gets this notification |
| `bookingId` | UUID | YES | null | Related booking (optional) |
| `type` | VARCHAR(50) | NO | - | Type of notification |
| `title` | VARCHAR(255) | NO | - | Notification title |
| `message` | TEXT | NO | - | Notification message |
| `isRead` | BOOLEAN | NO | false | Read/unread status |
| `actionUrl` | VARCHAR(500) | YES | null | Where to navigate on click |
| `createdAt` | TIMESTAMPTZ | NO | NOW() | When created |
| `updatedAt` | TIMESTAMPTZ | NO | NOW() | When last updated |

---

## 🚀 Setup Steps

### Step 1: Go to Supabase SQL Editor
1. Open your Supabase project dashboard
2. Click on **"SQL Editor"** in the left sidebar (looks like `</>`)
3. Click **"New Query"**

### Step 2: Run the Setup Script
1. Copy ALL the SQL from `SUPABASE_NOTIFICATION_TABLE_SETUP.sql`
2. Paste it into the SQL Editor
3. Click **"Run"** button (or press Ctrl+Enter)
4. ✅ Wait for success message

### Step 3: Verify Table Structure
After running the script, click on **"Table Editor"** in the left sidebar, then click on **"Notification"** table.

You should see these columns:

```
✅ id              (uuid)
✅ userId          (uuid)
✅ bookingId       (uuid, nullable)
✅ type            (varchar)
✅ title           (varchar)
✅ message         (text)
✅ isRead          (bool)
✅ actionUrl       (varchar, nullable)
✅ createdAt       (timestamptz)
✅ updatedAt       (timestamptz)
```

### Step 4: Check Foreign Keys
1. Click on the `Notification` table in Table Editor
2. Go to the **"Foreign Keys"** tab
3. You should see:
   - `notification_userid_fkey` → References `User(id)`
   - `notification_bookingid_fkey` → References `Booking(id)`

### Step 5: Verify RLS Policies
1. Click on the `Notification` table
2. Go to **"Policies"** tab
3. Check "Enable RLS" is turned ON
4. You should see these policies:
   - ✅ "Users can view own notifications" (SELECT)
   - ✅ "Users can update own notifications" (UPDATE)
   - ✅ "Users can delete own notifications" (DELETE)
   - ✅ "Service role can insert notifications" (INSERT)

---

## 🎨 Valid Notification Types

The table accepts ONLY these 8 notification types:

| Type | When It's Used | Who Receives It |
|------|----------------|-----------------|
| `BOOKING_CREATED` | When client creates booking | All admins |
| `PHOTOGRAPHER_ASSIGNED` | When admin assigns photographer | Photographer + Client |
| `PHOTOGRAPHER_ACCEPTED` | When photographer accepts | Client + Admins |
| `PHOTOGRAPHER_REJECTED` | When photographer rejects | Client + Admins |
| `STATUS_CHANGE` | When booking status changes | Related users |
| `MESSAGE` | When someone sends message | Message receiver |
| `PAYMENT` | When payment is made | Client + Photographer |
| `BOOKING_CANCELLED` | When booking is cancelled | All related users |

---

## 🔍 How to Verify It's Working

### Option 1: Insert Test Data
Run this in SQL Editor (replace with real user ID):

```sql
-- Get a real user ID first
SELECT id, email FROM "User" LIMIT 1;

-- Insert test notification (replace YOUR_USER_ID_HERE)
INSERT INTO "Notification" (
  "userId",
  type,
  title,
  message,
  "isRead",
  "actionUrl"
) VALUES (
  'YOUR_USER_ID_HERE',
  'BOOKING_CREATED',
  'Test Notification',
  'This is a test to verify the table works!',
  false,
  '/bookings'
);
```

### Option 2: Check Via API
After backend is running, test with:

```bash
# Get notifications (you must be logged in)
curl http://localhost:3000/api/notifications
```

### Option 3: View in Table Editor
1. Go to Table Editor → Notification table
2. You should see test notifications appear here
3. Check all columns have values

---

## 📊 What the SQL Script Does

The script is **SAFE** to run multiple times. It:

1. ✅ Creates `Notification` table if it doesn't exist
2. ✅ Adds any missing columns (doesn't break existing data)
3. ✅ Creates foreign keys to `User` and `Booking` tables
4. ✅ Creates indexes for fast queries
5. ✅ Adds validation (only valid notification types allowed)
6. ✅ Sets up auto-update trigger for `updatedAt`
7. ✅ Enables Row Level Security (RLS) with proper policies
8. ✅ Protects user data (users only see their own notifications)

---

## 🚨 Troubleshooting

### Error: "relation 'User' does not exist"
**Fix:** You need to create the `User` table first. The Notification table references User IDs.

### Error: "relation 'Booking' does not exist"
**Fix:** You need to create the `Booking` table first. The Notification table can reference Booking IDs.

### Error: "constraint already exists"
**Fix:** This is OK! It means the constraint is already there. The script handles this gracefully.

### RLS Policies Not Working
**Fix:** Make sure you're using the **service_role key** in your backend, not the anon key.

In `src/lib/supabaseAdmin.ts`, you should have:
```typescript
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // ← Must be service role key!
);
```

---

## ✅ Final Checklist

Before testing your backend, verify:

- [ ] Notification table exists in Supabase
- [ ] All 10 columns present (id, userId, bookingId, type, title, message, isRead, actionUrl, createdAt, updatedAt)
- [ ] Foreign keys to User and Booking tables exist
- [ ] RLS is enabled with 4 policies
- [ ] Indexes are created (for performance)
- [ ] Can insert test notification successfully
- [ ] Backend service role key is set in `.env.local`

---

## 🎉 You're Ready!

Once all checkboxes are ✅, your database is ready for the notification system!

**Next Steps:**
1. Run the SQL script: `SUPABASE_NOTIFICATION_TABLE_SETUP.sql`
2. Verify table structure in Table Editor
3. Start your backend: `npm run dev`
4. Test notification creation: Create a booking → Check if admin gets notification
5. Test frontend: Notification bell should show badge count

---

## 📞 Need Help?

### Check Your Current Table Structure
Run this in SQL Editor:
```sql
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Notification'
ORDER BY ordinal_position;
```

### Check Indexes
```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'Notification';
```

### Check Foreign Keys
```sql
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'Notification'
  AND tc.constraint_type = 'FOREIGN KEY';
```

---

**Your notification system database is ready! 🚀**
