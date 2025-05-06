"use client";

import MultiStepBooking from "@/components/MultiStepBooking";
import { BookingProvider } from "@/context/BookingContext";

export default function BookingPage() {
  return (
    <BookingProvider>
      <MultiStepBooking />
    </BookingProvider>
  );
}
