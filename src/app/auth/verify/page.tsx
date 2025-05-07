"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/button";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState<string>("Verifying your email...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setError("Invalid or missing token.");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Your email has been successfully verified!");
        } else {
          setStatus("error");
          setError(data.error || "Verification failed.");
        }
      } catch {
        setStatus("error");
        setError("Something went wrong. Please try again later.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-8">
          <img src="/icons/logo.svg" alt="Logo" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold text-center">Email Verification</h2>
        
        <div className="mt-8 space-y-4 text-center">
          {status === "verifying" && (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-[#0F553E]" />
              <p className="text-muted-foreground">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-green-600 font-medium">{message}</p>
              <Link href="http://localhost:3001/auth/login" className="block mt-4">
                <Button className="w-full bg-[#0F553E] hover:bg-[#0F553E]/90 text-white">
                  Continue to Login
                </Button>
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-red-600 font-medium">{error}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
                <Link href="http://localhost:3001/auth/signup" className="flex-1">
                  <Button className="w-full bg-[#0F553E] hover:bg-[#0F553E]/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-[#0F553E] underline-offset-4 hover:underline"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}