"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Step1PropertyDetails from "./Step1PropertyDetails";
import Step2PackageSelection from "./Step2PackageSelection";
import Step3DateTime from "./Step3DateTime";
import { BookingData } from "@/context/BookingContext";
//import Step4Login from "./Step4Login";

export default function MultiStepBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleDateTimeNext = (bookingData: BookingData) => {
    // Save the booking data to local storage
    localStorage.setItem("booking", JSON.stringify(bookingData));

    // Redirect to login if the user is not authenticated
    if (!session?.user) {
      router.push("/auth/login");
    } else {
      handleNext(); // Proceed to the next step if authenticated
    }
  };

  return (
    <div>
      {currentStep === 1 && <Step1PropertyDetails onNext={handleNext} />}
      {currentStep === 2 && (
        <Step2PackageSelection onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {currentStep === 3 && (
        <Step3DateTime
          onNext={handleDateTimeNext} // Custom handler for Step 3
          onPrevious={handlePrevious}
        />
      )}
      {/*currentStep === 4 && (
        <Step4Login onLogin={handleLoginRedirect} onPrevious={handlePrevious} />
      )*/}
      {/*currentStep === 5 && (
        <Step5Payment onPrevious={handlePrevious} />
      )*/}
    </div>
  );
}