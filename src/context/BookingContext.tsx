"use client";

import React, { useState, useEffect } from "react";

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface SelectedPackage {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  pricePerExtra: number;
}

export interface PropertyAddress {
  buildingName: string;
  unitNumber: string;
  floor: string;
  street: string;
}

export interface BookingData {
  selectedPackage?: SelectedPackage;
  isLoading?: boolean;
  propertyType?: string;
  propertySize?: string;
  propertyAddress?: PropertyAddress;
  addOns?: AddOn[];
  date?: string;
  timeSlot?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  userId?: string; // Add userId to track logged-in user
  status?: "CREATED" | "PHOTOGRAPHER_ASSIGNED" | "SHOOTING" | "EDITING" | "COMPLETED"; // Add status
}

type BookingContextType = {
  booking: BookingData;
  setBooking: (value: BookingData | ((prev: BookingData) => BookingData)) => void;
  resetBooking: () => void;
};

type SetBookingType = React.Dispatch<React.SetStateAction<BookingData>>;


export const BookingContext = React.createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [booking, setBookingState] = useState<BookingData>(() => {
    // Load initial state from local storage
    if (typeof window !== "undefined") {
      const savedBooking = localStorage.getItem("booking");
      return savedBooking
        ? JSON.parse(savedBooking)
        : {
            selectedPackage: undefined,
            isLoading: false,
            propertyType: "",
            propertySize: "",
            propertyAddress: undefined,
            addOns: [],
            date: "",
            timeSlot: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
          };
    }
    return {
      selectedPackage: undefined,
      isLoading: false,
      propertyType: "",
      propertySize: "",
      propertyAddress: undefined,
      addOns: [],
      date: "",
      timeSlot: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    };
  });

  const setBooking: SetBookingType = (data) => {
    setBookingState((prev) => (typeof data === "function" ? data(prev) : { ...prev, ...data }));
  };

  // Save booking state to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("booking", JSON.stringify(booking));
    }
    console.log("Booking Context Updated:", booking); // Debugging log
  }, [booking]);

  const resetBooking = () => {
    setBookingState({
      selectedPackage: undefined,
      isLoading: false,
      propertyType: "",
      propertySize: "",
      propertyAddress: undefined,
      addOns: [],
      date: "",
      timeSlot: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    });
    localStorage.removeItem("booking"); // Clear local storage on reset
  };

  return (
    <BookingContext.Provider value={{ booking, setBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = React.useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
