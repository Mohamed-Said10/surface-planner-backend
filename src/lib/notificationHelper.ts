/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/notificationHelper.ts
import supabase from "@/lib/supabaseAdmin";

export type NotificationType =
  | "BOOKING_CREATED"
  | "PHOTOGRAPHER_ASSIGNED"
  | "PHOTOGRAPHER_ACCEPTED"
  | "PHOTOGRAPHER_REJECTED"
  | "STATUS_CHANGE"
  | "MESSAGE"
  | "PAYMENT"
  | "BOOKING_CANCELLED";

interface CreateNotificationParams {
  userId: string;
  bookingId?: string;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string;
}

/**
 * Helper function to create notifications
 * This can be called from various endpoints to create notifications automatically
 */
export async function createNotification(params: CreateNotificationParams) {
  try {
    const { userId, bookingId, type, title, message, actionUrl } = params;

    const { data, error } = await supabase
      .from("Notification")
      .insert({
        userId,
        bookingId: bookingId || null,
        type,
        title,
        message,
        actionUrl: actionUrl || null,
        isRead: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating notification:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in createNotification:", error);
    return null;
  }
}

/**
 * Create notification for booking creation
 */
export async function notifyBookingCreated(
  clientId: string,
  bookingId: string,
  bookingShortId: string
) {
  return createNotification({
    userId: clientId,
    bookingId,
    type: "BOOKING_CREATED",
    title: "Booking Created Successfully",
    message: `Your booking ${bookingShortId} has been created and is awaiting photographer assignment.`,
    actionUrl: `/bookings/${bookingId}`,
  });
}

/**
 * Create notifications for photographer assignment
 */
export async function notifyPhotographerAssigned(
  photographerId: string,
  clientId: string,
  bookingId: string,
  bookingShortId: string,
  photographerName: string
) {
  // Notify photographer
  await createNotification({
    userId: photographerId,
    bookingId,
    type: "PHOTOGRAPHER_ASSIGNED",
    title: "New Booking Assignment",
    message: `You have been assigned to booking ${bookingShortId}. Please review and accept.`,
    actionUrl: `/dash/photographer/booking-details/${bookingId}`,
  });

  // Notify client
  await createNotification({
    userId: clientId,
    bookingId,
    type: "PHOTOGRAPHER_ASSIGNED",
    title: "Photographer Assigned",
    message: `${photographerName} has been assigned to your booking ${bookingShortId}.`,
    actionUrl: `/bookings/${bookingId}`,
  });
}

/**
 * Create notifications for photographer acceptance
 */
export async function notifyPhotographerAccepted(
  clientId: string,
  bookingId: string,
  bookingShortId: string,
  photographerName: string
) {
  return createNotification({
    userId: clientId,
    bookingId,
    type: "PHOTOGRAPHER_ACCEPTED",
    title: "Photographer Accepted Booking",
    message: `${photographerName} has accepted your booking ${bookingShortId}.`,
    actionUrl: `/bookings/${bookingId}`,
  });
}

/**
 * Create notifications for status changes
 */
export async function notifyStatusChange(
  userId: string,
  bookingId: string,
  bookingShortId: string,
  newStatus: string,
  userRole: "CLIENT" | "PHOTOGRAPHER"
) {
  const statusMessages: Record<string, { title: string; message: string }> = {
    SHOOTING: {
      title: "Photo Shoot in Progress",
      message: `The photo shoot for booking ${bookingShortId} is now in progress.`,
    },
    EDITING: {
      title: "Photos Being Edited",
      message: `Your photos from booking ${bookingShortId} are now being edited.`,
    },
    COMPLETED: {
      title: "Booking Completed",
      message: `Booking ${bookingShortId} has been completed. Your photos are ready!`,
    },
    PHOTOGRAPHER_ACCEPTED: {
      title: "Photographer Accepted",
      message: `The photographer has accepted booking ${bookingShortId}.`,
    },
  };

  const statusInfo = statusMessages[newStatus];
  if (!statusInfo) return null;

  return createNotification({
    userId,
    bookingId,
    type: "STATUS_CHANGE",
    title: statusInfo.title,
    message: statusInfo.message,
    actionUrl:
      userRole === "PHOTOGRAPHER"
        ? `/dash/photographer/booking-details/${bookingId}`
        : `/bookings/${bookingId}`,
  });
}

/**
 * Create notification for payment received
 */
export async function notifyPaymentReceived(
  clientId: string,
  photographerId: string,
  bookingId: string,
  bookingShortId: string,
  amount: number
) {
  // Notify client
  await createNotification({
    userId: clientId,
    bookingId,
    type: "PAYMENT",
    title: "Payment Confirmed",
    message: `Your payment of $${amount} for booking ${bookingShortId} has been received.`,
    actionUrl: `/bookings/${bookingId}`,
  });

  // Notify photographer if assigned
  if (photographerId) {
    await createNotification({
      userId: photographerId,
      bookingId,
      type: "PAYMENT",
      title: "Booking Payment Received",
      message: `Payment of $${amount} received for booking ${bookingShortId}.`,
      actionUrl: `/dash/photographer/booking-details/${bookingId}`,
    });
  }
}

/**
 * Create notification for photographer rejection
 */
export async function notifyPhotographerRejected(
  bookingId: string,
  photographerName: string,
  bookingShortId: string
) {
  // Get all admins
  const { data: admins, error } = await supabase
    .from("User")
    .select("id")
    .eq("role", "ADMIN");

  if (error || !admins) {
    console.error("Error fetching admins:", error);
    return;
  }

  // Notify all admins
  for (const admin of admins) {
    await createNotification({
      userId: admin.id,
      bookingId,
      type: "PHOTOGRAPHER_REJECTED",
      title: "Photographer Declined Booking",
      message: `${photographerName} has declined booking ${bookingShortId}. Please assign another photographer.`,
      actionUrl: `/dash/admin/booking-details/${bookingId}`,
    });
  }
}

/**
 * Create notification for booking cancellation
 */
export async function notifyBookingCancelled(
  bookingId: string,
  bookingShortId: string,
  clientId: string,
  photographerId: string | null,
  reason?: string
) {
  const message = `Booking ${bookingShortId} has been cancelled${reason ? `: ${reason}` : ""}.`;

  // Notify client
  await createNotification({
    userId: clientId,
    bookingId,
    type: "BOOKING_CANCELLED",
    title: "Booking Cancelled",
    message,
    actionUrl: `/bookings/${bookingId}`,
  });

  // Notify photographer if assigned
  if (photographerId) {
    await createNotification({
      userId: photographerId,
      bookingId,
      type: "BOOKING_CANCELLED",
      title: "Booking Cancelled",
      message,
      actionUrl: `/dash/photographer/booking-details/${bookingId}`,
    });
  }

  // Notify admins
  const { data: admins } = await supabase
    .from("User")
    .select("id")
    .eq("role", "ADMIN");

  if (admins) {
    for (const admin of admins) {
      await createNotification({
        userId: admin.id,
        bookingId,
        type: "BOOKING_CANCELLED",
        title: "Booking Cancelled",
        message,
        actionUrl: `/dash/admin/booking-details/${bookingId}`,
      });
    }
  }
}

/**
 * Helper to notify all admins of a new booking
 */
export async function notifyAdminsOfNewBooking(
  bookingId: string,
  clientName: string,
  bookingReference: string
) {
  const { data: admins, error } = await supabase
    .from("User")
    .select("id")
    .eq("role", "ADMIN");

  if (error || !admins) {
    console.error("Error fetching admins:", error);
    return;
  }

  for (const admin of admins) {
    await createNotification({
      userId: admin.id,
      bookingId,
      type: "BOOKING_CREATED",
      title: "New Booking Request",
      message: `${clientName} has created a new booking (${bookingReference}). Please review and assign a photographer.`,
      actionUrl: `/dash/admin/booking-details/${bookingId}`,
    });
  }
}
