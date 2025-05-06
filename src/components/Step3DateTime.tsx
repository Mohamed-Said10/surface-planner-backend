"use client";

import React, { useState } from "react";
import { BookingData, useBooking } from "../context/BookingContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Step3DateTime({
  onNext,
  onPrevious,
}: {
  onNext: (bookingData: BookingData) => void;
  onPrevious: () => void;
}) {
  const bookingContext = useBooking();
  if (!bookingContext) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  const { setBooking, booking } = bookingContext;
  const { resetBooking } = useBooking();
  const { data: session } = useSession();
  const router = useRouter();

  const [date, setDate] = useState(booking.date || "");
  const [timeSlot, setTimeSlot] = useState(booking.timeSlot || "");
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (!date || !timeSlot) {
      setError("Please select a date and time before continuing.");
      return;
    }

    // Update the booking context
    setBooking({
      ...booking,
      date,
      timeSlot,
    });

    // Save the updated booking to local storage
    localStorage.setItem(
      "booking",
      JSON.stringify({
        ...booking,
        date,
        timeSlot,
      })
    );

    console.log("Updated Booking Context with Date & Time:", {
      ...booking,
      date,
      timeSlot,
    });

    setError(null);

    // Redirect to login if the user is not authenticated
    if (!session?.user) {
      router.push("/auth/login");
    } else {
      onNext({
        ...booking,
        date,
        timeSlot,
      }); // Proceed to the next step if the user is authenticated
    }
  };

  const handleLogout = async () => {
    resetBooking(); // Clear the booking context and local storage
    await signOut({ callbackUrl: "/" }); // Redirect to the home page after logout
  };

  return (
    <>
      {session?.user && (
        <div>
          <h1>Welcome to the Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <button
        onClick={onPrevious}
        className="py-2 px-6 rounded-md text-white bg-gray-600 hover:bg-gray-700"
      >
        Return
      </button>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Step 3: Select Date & Time
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Time Slot
            </label>
            <input
              type="time"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="py-2 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Next Step
          </button>
        </div>
      </div>
    </>
  );
}