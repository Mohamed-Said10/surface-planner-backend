"use client";

import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function Dashboard() {
  const router = useRouter();
  const hasRun = useRef(false); // ✅ guard to prevent double-run

  useEffect(() => {
    const checkSessionAndBooking = async () => {
      if (hasRun.current) return; // ✅ prevent second execution
      hasRun.current = true;

      const session = await getSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking) {
        const bookingData = JSON.parse(pendingBooking);

        const completeBookingData = {
          ...bookingData,
          userId: session?.user?.id || "",
        };

        try {
          const response = await fetch("/api/booking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(completeBookingData),
          });

          if (response.ok) {
            alert("Booking confirmed!");
            localStorage.removeItem("pendingBooking");
            router.push("/pages/dashboard/client"); // ✅ correct path
          } else {
            const errorData = await response.json();
            alert(errorData.error || "Failed to create booking. Please try again.");
          }
        } catch (error) {
          console.error("Error creating booking:", error);
          alert("An error occurred. Please try again.");
        }
      }
    };

    checkSessionAndBooking();
  }, [router]);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
        Logout
      </button>
    </div>
  );
}
