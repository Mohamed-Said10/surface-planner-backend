"use client";

import React, { useState, useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import { signOut, useSession } from "next-auth/react";


// Define types for better type safety
type PropertyDetails = {
  propertyType: string;
  propertySize: string;
  buildingName: string;
  unitNumber: string;
  floor: string;
  street: string;
};

export default function BookingDetailsStep({ onNext }: { onNext: () => void}) {
  const bookingContext = useBooking();
  const { resetBooking } = useBooking();
  const { data: session } = useSession();
  if (!bookingContext) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  const { setBooking, booking } = bookingContext;

  const [details, setDetails] = useState<PropertyDetails>({
    propertyType: booking.propertyType || "",
    propertySize: booking.propertySize || "",
    buildingName: booking.propertyAddress?.buildingName || "",
    unitNumber: booking.propertyAddress?.unitNumber || "",
    floor: booking.propertyAddress?.floor || "",
    street: booking.propertyAddress?.street || "",
  });

  const [errors, setErrors] = useState<Partial<PropertyDetails>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
    console.log("Booking Details:", { ...details, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof PropertyDetails]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: Partial<PropertyDetails> = {};
    
    if (!details.propertyType.trim()) {
      newErrors.propertyType = "Property type is required";
    }
    
    if (!details.propertySize.trim()) {
      newErrors.propertySize = "Property size is required";
    } else if (!/^\d+(\.\d+)?$/.test(details.propertySize)) {
      newErrors.propertySize = "Please enter a valid number";
    }
    
    if (!details.street.trim()) {
      newErrors.street = "Street address is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateInputs()) {
      return; // Don't proceed if validation fails
    }

    // Save the updated details to the context
    setBooking({
      ...booking, // Preserve existing booking data
      propertyType: details.propertyType,
      propertySize: details.propertySize,
      propertyAddress: {
        buildingName: details.buildingName,
        unitNumber: details.unitNumber,
        floor: details.floor,
        street: details.street,
      },
      isLoading: false, // Default value as per your schema
    });
    
    console.log("Updated Booking Context:", {
      ...booking,
      propertyType: details.propertyType,
      propertySize: details.propertySize,
      propertyAddress: {
        buildingName: details.buildingName,
        unitNumber: details.unitNumber,
        floor: details.floor,
        street: details.street,
      },
    });
    
    onNext(); // Move to the next step
  };

  useEffect(() => {
    console.log("Booking Context Updated:", booking);
  }, [booking]);

  const handleLogout = async () => {
    resetBooking(); // Clear the booking context and local storage
    await signOut({ callbackUrl: "/" }); // Redirect to the home page after logout
  };

  return (
    <>

    {session?.user && <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>}
 
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Step 1: Property Details</h2>
      
      <div className="space-y-2">
        <label className="block font-medium">Property Type*</label>
        <select
          name="propertyType"
          value={details.propertyType}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.propertyType ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select property type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
          <option value="Other">Other</option>
        </select>
        {errors.propertyType && (
          <p className="text-red-500 text-sm">{errors.propertyType}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Property Size (sq ft)*</label>
        <input
          type="text"
          name="propertySize"
          placeholder="e.g. 1200"
          value={details.propertySize}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.propertySize ? 'border-red-500' : ''}`}
          required
        />
        {errors.propertySize && (
          <p className="text-red-500 text-sm">{errors.propertySize}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block font-medium">Building Name</label>
          <input
            type="text"
            name="buildingName"
            placeholder="Optional"
            value={details.buildingName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Unit Number</label>
          <input
            type="text"
            name="unitNumber"
            placeholder="Optional"
            value={details.unitNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block font-medium">Floor</label>
          <input
            type="text"
            name="floor"
            placeholder="Optional"
            value={details.floor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Street Address*</label>
          <input
            type="text"
            name="street"
            placeholder="123 Main St"
            value={details.street}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.street ? 'border-red-500' : ''}`}
            required
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-6 transition-colors"
      >
        Next Step
      </button>
    </div>
    </>
  );
}