import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data: user, error: userError } = await supabase
      .from("User")
      .select("id")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userId = user.id;
    const encoder = new TextEncoder();
    let channelRef: ReturnType<typeof supabase.channel> | null = null;
    let heartbeatInterval: NodeJS.Timeout | null = null;
    let isCleaningUp = false;
    const sentNotificationIds = new Set<string>();

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));

        heartbeatInterval = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(': heartbeat\n\n'));
          } catch (error) {
            cleanup();
          }
        }, 30000);

        channelRef = supabase
          .channel(`notifications:${userId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'Notification',
              filter: `userId=eq.${userId}`,
            },
            (payload) => {
              const notificationId = payload.new.id;
              if (sentNotificationIds.has(notificationId)) {
                return;
              }
              sentNotificationIds.add(notificationId);
              const message = `event: notification\ndata: ${JSON.stringify(payload.new)}\n\n`;
              controller.enqueue(encoder.encode(message));
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'Notification',
              filter: `userId=eq.${userId}`,
            },
            (payload) => {
              const message = `event: notification-update\ndata: ${JSON.stringify(payload.new)}\n\n`;
              controller.enqueue(encoder.encode(message));
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'DELETE',
              schema: 'public',
              table: 'Notification',
              filter: `userId=eq.${userId}`,
            },
            (payload) => {
              const message = `event: notification-delete\ndata: ${JSON.stringify({ notificationId: payload.old.id })}\n\n`;
              controller.enqueue(encoder.encode(message));
            }
          )
          .subscribe();

        const cleanup = () => {
          if (isCleaningUp) return;
          isCleaningUp = true;
          
          if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = null;
          }
          
          if (channelRef) {
            supabase.removeChannel(channelRef);
            channelRef = null;
          }
          
          try {
            controller.close();
          } catch (error) {
            // Ignore
          }
        };

        req.signal.addEventListener('abort', cleanup);
      },

      cancel() {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        if (channelRef) supabase.removeChannel(channelRef);
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to establish SSE connection" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
