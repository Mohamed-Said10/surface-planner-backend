"use client";

import React, { useEffect, useState } from "react";
import { BookingData, useBooking } from "../context/BookingContext";
import { useSession } from "next-auth/react";

interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  pricePerExtra: number;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

const packages: Package[] = [
  {
    id: 1,
    name: "Silver Package",
    price: 800,
    description: "Basic package for property listings.",
    features: ["10 High-Quality Photos", "2D Floor Plan"],
    pricePerExtra: 0.1,
  },
  {
    id: 2,
    name: "Gold Package",
    price: 1100,
    description: "Great for engaging property presentations.",
    features: [
      "18 High-Quality Photos",
      "2D Floor Plan",
      "7 AI Room Staging Photos",
      "1-2 Minute Video Tour",
    ],
    pricePerExtra: 0.15,
  },
  {
    id: 3,
    name: "Diamond Package",
    price: 1500,
    description: "Premium package for luxury properties.",
    features: [
      "25 High-Quality Photos",
      "3D Floor Plan",
      "10 AI Room Staging Photos",
      "2-3 Minute Video Tour",
    ],
    pricePerExtra: 0.2,
  },
];

const addOns: AddOn[] = [
  { id: "1", name: "5 Extra Photos", price: 150 },
  { id: "2", name: "10 Photos", price: 300 },
  { id: "3", name: "3D Floor Plan", price: 200 },
  { id: "4", name: "Video 1-2 mins", price: 400 },
];

export default function PackageSelectionStep({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) {
  const bookingContext = useBooking();
  const { setBooking, booking } = bookingContext;
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user && booking.userId !== session.user.id) {
      setBooking((prev: BookingData) => ({
        ...prev,
        firstName: session.user?.name?.split(" ")[0] || "",
        lastName: prev.lastName || "",
        email: session.user?.email || "",
        phoneNumber: prev.phoneNumber || "",
        userId: session.user?.id || "",
      }));
    }
  }, [session, setBooking, booking.userId]);

  const handleSelectPackage = (pkg: Package) => {
    setBooking({
      ...booking,
      selectedPackage: pkg,
    });
    setError(null);
    console.log("Selected Package:", {
      ...booking,
      selectedPackage: pkg,
    });
  };

  const handleAddOnChange = (addOn: AddOn) => {
    const existingAddOns = booking.addOns || [];
    const isSelected = existingAddOns.some((item) => item.id === addOn.id);

    setBooking({
      ...booking,
      addOns: isSelected
        ? existingAddOns.filter((item) => item.id !== addOn.id)
        : [...existingAddOns, addOn],
    });
    console.log("Updated Add-Ons:", booking.addOns);
  };

  const handleNext = () => {
    if (!booking.selectedPackage) {
      setError("Please select a package before proceeding.");
      return;
    }

    console.log("Proceeding to the next step with booking data:", booking);
    onNext(); // Proceed to the next step
  };

  return (
    <>
      {session?.user && (
        <div>
          <h1>Welcome, {session.user.name}</h1>
        </div>
      )}
      <button
        onClick={onPrevious}
        className="py-2 px-6 rounded-md text-white bg-gray-600 hover:bg-gray-700"
      >
        Return
      </button>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Step 2: Select Your Package</h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                booking.selectedPackage?.id === pkg.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleSelectPackage(pkg)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{pkg.name}</h3>
              <p className="text-blue-600 font-bold text-2xl my-2">${pkg.price}</p>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <ul className="space-y-2 mb-4">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Add-Ons</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {addOns.map((addOn) => (
              <div
                key={addOn.id}
                className={`border rounded-lg p-4 flex items-center justify-between ${
                  booking.addOns?.some((item) => item.id === addOn.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 rounded"
                    checked={booking.addOns?.some((item) => item.id === addOn.id) || false}
                    onChange={() => handleAddOnChange(addOn)}
                  />
                  <span className="text-gray-700">{addOn.name}</span>
                </label>
                <span className="font-medium">+${addOn.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!booking.selectedPackage}
            className={`py-2 px-6 rounded-md text-white ${
              !booking.selectedPackage
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next Step
          </button>
        </div>
      </div>
    </>
  );
}