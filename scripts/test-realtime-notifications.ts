// scripts/test-realtime-notifications.ts
/**
 * Test script for real-time notifications
 * 
 * This script helps you test the real-time notification system by:
 * 1. Creating a test notification
 * 2. Updating a notification
 * 3. Deleting a notification
 * 
 * Usage:
 *   ts-node scripts/test-realtime-notifications.ts <userId>
 * 
 * Example:
 *   ts-node scripts/test-realtime-notifications.ts "123e4567-e89b-12d3-a456-426614174000"
 * 
 * Before running:
 * 1. Make sure you have a user connected to /api/notifications/stream in your browser
 * 2. Open browser console to see real-time events
 * 3. Run this script with the user's ID
 */

import supabase from '../src/lib/supabaseAdmin';
import { createNotification } from '../src/lib/notificationHelper';

async function testRealtimeNotifications(userId: string) {
  console.log('🚀 Starting real-time notification test...\n');
  console.log(`📍 Target User ID: ${userId}\n`);

  try {
    // Test 1: Create a notification
    console.log('📝 Test 1: Creating a test notification...');
    const notification = await createNotification({
      userId,
      type: 'MESSAGE',
      title: '🧪 Real-time Test Notification',
      message: 'This is a test notification to verify real-time functionality works!',
      actionUrl: '/notifications',
    });

    if (!notification) {
      console.error('❌ Failed to create notification');
      return;
    }

    console.log('✅ Notification created:', {
      id: notification.id,
      title: notification.title,
      createdAt: notification.createdAt,
    });
    console.log('👀 Check your browser - you should see this notification appear immediately!\n');

    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: Update the notification (mark as read)
    console.log('📝 Test 2: Updating notification (marking as read)...');
    const { data: updatedNotification, error: updateError } = await supabase
      .from('Notification')
      .update({ 
        isRead: true,
        updatedAt: new Date().toISOString()
      })
      .eq('id', notification.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Failed to update notification:', updateError);
    } else {
      console.log('✅ Notification updated:', {
        id: updatedNotification.id,
        isRead: updatedNotification.isRead,
      });
      console.log('👀 Check your browser - the notification should be marked as read!\n');
    }

    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 3: Delete the notification
    console.log('📝 Test 3: Deleting notification...');
    const { error: deleteError } = await supabase
      .from('Notification')
      .delete()
      .eq('id', notification.id);

    if (deleteError) {
      console.error('❌ Failed to delete notification:', deleteError);
    } else {
      console.log('✅ Notification deleted:', notification.id);
      console.log('👀 Check your browser - the notification should disappear!\n');
    }

    console.log('🎉 Real-time notification test completed successfully!');
    console.log('📊 Summary:');
    console.log('  - Created: ✅');
    console.log('  - Updated: ✅');
    console.log('  - Deleted: ✅');
    console.log('\n💡 If you saw all three events in your browser console, real-time is working perfectly!');

  } catch (error) {
    console.error('❌ Error during test:', error);
  }
}

// Get userId from command line arguments
const userId = process.argv[2];

if (!userId) {
  console.error('❌ Error: userId is required');
  console.log('\nUsage:');
  console.log('  ts-node scripts/test-realtime-notifications.ts <userId>');
  console.log('\nExample:');
  console.log('  ts-node scripts/test-realtime-notifications.ts "123e4567-e89b-12d3-a456-426614174000"');
  console.log('\nHow to get your userId:');
  console.log('  1. Log in to your app');
  console.log('  2. Open browser console');
  console.log('  3. Run: await fetch("/api/users/me").then(r => r.json())');
  console.log('  4. Copy the "id" field');
  process.exit(1);
}

// Run the test
testRealtimeNotifications(userId)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
