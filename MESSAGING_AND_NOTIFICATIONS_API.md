# Messaging and Notifications API Documentation

## Overview
This document describes the messaging and notification system for the photographer booking platform. The system allows photographers and clients to communicate about bookings and receive real-time notifications about booking status changes.

## Database Setup

### Required Tables in Supabase

#### 1. Message Table
```sql
CREATE TABLE "Message" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "bookingId" UUID NOT NULL REFERENCES "Booking"(id) ON DELETE CASCADE,
  "senderId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "receiverId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  "isRead" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_messages_booking ON "Message"("bookingId");
CREATE INDEX idx_messages_sender ON "Message"("senderId");
CREATE INDEX idx_messages_receiver ON "Message"("receiverId");
CREATE INDEX idx_messages_created ON "Message"("createdAt" DESC);
```

#### 2. Notification Table
```sql
CREATE TABLE "Notification" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "bookingId" UUID REFERENCES "Booking"(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  "isRead" BOOLEAN DEFAULT false,
  "actionUrl" VARCHAR(500),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_user ON "Notification"("userId");
CREATE INDEX idx_notifications_read ON "Notification"("isRead");
CREATE INDEX idx_notifications_created ON "Notification"("createdAt" DESC);
```

## API Endpoints

### Messages API

#### 1. Get Messages
**Endpoint:** `GET /api/messages`

**Query Parameters:**
- `bookingId` (optional): Get messages for a specific booking
- `conversationWith` (optional): Get conversation with a specific user ID

**Response:**
```json
[
  {
    "id": "uuid",
    "bookingId": "uuid",
    "senderId": "uuid",
    "receiverId": "uuid",
    "content": "Message content",
    "isRead": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "sender": {
      "id": "uuid",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com",
      "role": "PHOTOGRAPHER"
    },
    "receiver": { /* ... */ },
    "booking": {
      "id": "uuid",
      "shortId": "ABC123",
      "status": "PHOTOGRAPHER_ACCEPTED"
    }
  }
]
```

#### 2. Send Message
**Endpoint:** `POST /api/messages`

**Request Body:**
```json
{
  "bookingId": "uuid",
  "receiverId": "uuid",
  "content": "Your message here"
}
```

**Response:**
```json
{
  "id": "uuid",
  "bookingId": "uuid",
  "senderId": "uuid",
  "receiverId": "uuid",
  "content": "Your message here",
  "isRead": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "sender": { /* ... */ },
  "receiver": { /* ... */ },
  "booking": { /* ... */ }
}
```

**Note:** This automatically creates a notification for the receiver.

#### 3. Mark Message as Read
**Endpoint:** `PATCH /api/messages/[id]`

**Request Body:**
```json
{
  "isRead": true
}
```

**Note:** Only the receiver can mark messages as read.

#### 4. Delete Message
**Endpoint:** `DELETE /api/messages/[id]`

**Note:** Only the sender or admin can delete messages.

#### 5. Get Unread Message Count
**Endpoint:** `GET /api/messages/unread-count`

**Query Parameters:**
- `bookingId` (optional): Count unread messages for a specific booking

**Response:**
```json
{
  "count": 5
}
```

#### 6. Mark All Messages as Read
**Endpoint:** `POST /api/messages/mark-all-read`

**Request Body:**
```json
{
  "bookingId": "uuid"
}
```

**Response:**
```json
{
  "message": "All messages marked as read",
  "count": 3
}
```

### Notifications API

#### 1. Get Notifications
**Endpoint:** `GET /api/notifications`

**Query Parameters:**
- `isRead` (optional): Filter by read status ("true" or "false")
- `limit` (optional): Limit number of results

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "bookingId": "uuid",
    "type": "PHOTOGRAPHER_ACCEPTED",
    "title": "Photographer Accepted Booking",
    "message": "John Doe has accepted your booking ABC123.",
    "isRead": false,
    "actionUrl": "/bookings/uuid",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "booking": {
      "id": "uuid",
      "shortId": "ABC123",
      "status": "PHOTOGRAPHER_ACCEPTED"
    }
  }
]
```

#### 2. Create Notification (Admin Only)
**Endpoint:** `POST /api/notifications`

**Request Body:**
```json
{
  "userId": "uuid",
  "bookingId": "uuid",
  "type": "BOOKING_ASSIGNED",
  "title": "Notification Title",
  "message": "Notification message",
  "actionUrl": "/path/to/action"
}
```

#### 3. Update Notification
**Endpoint:** `PATCH /api/notifications/[id]`

**Request Body:**
```json
{
  "isRead": true
}
```

**Note:** Users can only update their own notifications.

#### 4. Delete Notification
**Endpoint:** `DELETE /api/notifications/[id]`

**Note:** Users can only delete their own notifications.

#### 5. Get Unread Notification Count
**Endpoint:** `GET /api/notifications/unread-count`

**Response:**
```json
{
  "count": 12
}
```

#### 6. Mark All Notifications as Read
**Endpoint:** `POST /api/notifications/mark-all-read`

**Response:**
```json
{
  "message": "All notifications marked as read",
  "count": 12
}
```

## Notification Types

The following notification types are automatically created:

1. **BOOKING_CREATED** - When a client creates a new booking
2. **BOOKING_ASSIGNED** - When an admin assigns a photographer to a booking
3. **PHOTOGRAPHER_ACCEPTED** - When a photographer accepts a booking
4. **STATUS_CHANGE** - When booking status changes (SHOOTING, EDITING, COMPLETED)
5. **NEW_MESSAGE** - When a new message is sent
6. **PAYMENT_RECEIVED** - When payment is confirmed
7. **BOOKING_COMPLETED** - When a booking is marked as completed

## Notification Helper Functions

The `notificationHelper.ts` file provides utility functions to create notifications:

```typescript
import {
  notifyBookingCreated,
  notifyPhotographerAssigned,
  notifyPhotographerAccepted,
  notifyStatusChange,
  notifyPaymentReceived
} from "@/lib/notificationHelper";

// Example: Notify when photographer is assigned
await notifyPhotographerAssigned(
  photographerId,
  clientId,
  bookingId,
  bookingShortId,
  photographerName
);
```

## Frontend Integration Examples

### React/Next.js Examples

#### Fetch Messages for a Booking
```typescript
const fetchMessages = async (bookingId: string) => {
  const response = await fetch(`/api/messages?bookingId=${bookingId}`);
  const messages = await response.json();
  return messages;
};
```

#### Send a Message
```typescript
const sendMessage = async (bookingId: string, receiverId: string, content: string) => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingId, receiverId, content }),
  });
  return await response.json();
};
```

#### Get Unread Notification Count (for Notification Bell)
```typescript
const getUnreadCount = async () => {
  const response = await fetch('/api/notifications/unread-count');
  const { count } = await response.json();
  return count;
};
```

#### Mark Notification as Read
```typescript
const markNotificationRead = async (notificationId: string) => {
  await fetch(`/api/notifications/${notificationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isRead: true }),
  });
};
```

#### Example: Notification Bell Component
```typescript
import { useEffect, useState } from 'react';

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch unread count
    fetch('/api/notifications/unread-count')
      .then(res => res.json())
      .then(data => setUnreadCount(data.count));

    // Fetch recent unread notifications
    fetch('/api/notifications?isRead=false&limit=5')
      .then(res => res.json())
      .then(data => setNotifications(data));

    // Poll every 30 seconds for updates
    const interval = setInterval(() => {
      fetch('/api/notifications/unread-count')
        .then(res => res.json())
        .then(data => setUnreadCount(data.count));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notification-bell">
      <button className="bell-icon">
        🔔
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </button>
      {/* Dropdown with notifications */}
    </div>
  );
}
```

## Security & Permissions

### Messages
- Users can only send messages for bookings they are associated with (client, photographer, or admin)
- Only the receiver can mark a message as read
- Only the sender or admin can delete a message
- Messages are automatically filtered to show only those where the user is sender or receiver

### Notifications
- Users can only view their own notifications
- Users can only update/delete their own notifications
- Only admins can manually create notifications via the API
- Most notifications are created automatically by the system

## Best Practices

1. **Real-time Updates:** Consider implementing WebSocket connections or Server-Sent Events for real-time message and notification delivery
2. **Pagination:** Implement pagination for messages and notifications in the frontend
3. **Sound/Visual Alerts:** Add sound or visual alerts for new messages and notifications
4. **Mark as Read:** Automatically mark messages/notifications as read when viewed
5. **Cleanup:** Consider implementing a cleanup job to delete old read notifications after a certain period

## Integration with Existing Endpoints

The notification system is already integrated with:
- ✅ `/api/bookings/[id]/accept` - Creates notification when photographer accepts

You should also integrate it with:
- `/api/bookings/[id]/assign` - Add notification when admin assigns photographer
- `/api/bookings/[id]/status` - Add notification on status changes
- Any payment processing endpoints

Example integration:
```typescript
import { notifyPhotographerAssigned } from "@/lib/notificationHelper";

// In your assign endpoint, after successfully assigning photographer:
await notifyPhotographerAssigned(
  photographerId,
  booking.clientId,
  bookingId,
  booking.shortId,
  `${photographer.firstname} ${photographer.lastname}`
);
```
