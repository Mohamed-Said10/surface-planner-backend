"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setError("Invalid or missing token.");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
        } else {
          setError(data.error || "Verification failed.");
        }
      } catch {
        setError("Something went wrong. Please try again later.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-8">
          <img src="/icons/logo.svg" alt="Logo" />
        </div>

        <h2 className="text-2xl font-bold text-center">Email Verification</h2>
        <p className="mt-2 text-gray-600 text-center">
          {message
            ? "Your email has been successfully verified!"
            : "Verifying your email, please wait..."}
        </p>

        {message && (
          <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        <div className="mt-6 text-center">
          <button
            className="bg-[#0F553E] hover:bg-[#0F553E]/90 w-full"
            
          >
            <a href="http://localhost:3001/auth/login" className="text-white">Go to Login</a>
          </button>
        </div>
      </div>
    </div>
  );
}
